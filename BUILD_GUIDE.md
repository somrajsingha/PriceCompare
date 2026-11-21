# Build Guide: Price Comparison + Reviews Platform (Java Spring Boot)

A step-by-step guide to building the whole project from scratch.

**What you're building:** a user searches for a product (e.g. *Sony ULT headphones*), sees the price on Amazon, Flipkart and other stores side by side, gets the cheapest store highlighted with the savings amount, and can read and write reviews on the same product page.

**Approach:** build everything with **mock store data first**, so the whole app works end to end. Then plug in real store connectors as your affiliate access gets approved. Every store sits behind one interface, so swapping mock for real never touches the rest of the app.

---

## 0. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| JDK | 21 | Virtual threads make parallel store calls cheap |
| Maven | 3.9+ | Or use the wrapper (`./mvnw`) that Spring Initializr generates |
| Docker Desktop | latest | Runs PostgreSQL locally |
| Node.js | 20+ | Only for the frontend (Phase 6) |
| IDE | IntelliJ IDEA / VS Code | Enable annotation processing for Lombok |
| Git + GitHub | | |

Do these in parallel on day one, since approvals take time:
- Join **Amazon Associates India**. Amazon's old Product Advertising API was retired in 2026 and replaced by the **Creators API** (OAuth2, credentials created in Associates Central under Tools, then Creators API). Access is tied to sales performance, so it may not be available to a brand-new account right away.
- Join the **Flipkart Affiliate** program (docs: affiliate.flipkart.com/api-docs) to get a tracking ID and token.

---

## 1. Create the Project

Go to **start.spring.io** and choose:
- Project: Maven, Language: Java, Spring Boot: latest stable 3.x
- Group: `com.pricecompare`, Artifact: `backend`, Packaging: Jar, Java: 21
- Dependencies: **Spring Web, Spring Data JPA, PostgreSQL Driver, Flyway Migration, Validation, Spring Security, Spring Cache, Spring Boot Actuator, Java Mail Sender, Lombok**

Then add these to `pom.xml` (use the current versions from Maven Central):

```xml
<dependency>
  <groupId>org.flywaydb</groupId>
  <artifactId>flyway-database-postgresql</artifactId>
</dependency>
<dependency>
  <groupId>com.github.ben-manes.caffeine</groupId>
  <artifactId>caffeine</artifactId>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-api</artifactId>
  <version>0.12.6</version>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-impl</artifactId>
  <version>0.12.6</version>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-jackson</artifactId>
  <version>0.12.6</version>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.6.0</version>
</dependency>
```

### Package layout

```
com.pricecompare
├── BackendApplication.java
├── config/        SecurityConfig, CacheConfig, CorsConfig
├── connector/     StoreConnector, MockStoreConnector, FlipkartConnector, AmazonConnector
├── dto/           Listing, Offer, ProductResult, ReviewRequest, ReviewView, auth DTOs
├── matching/      MatchingService
├── service/       SearchService, SearchFacade, ProductService, ReviewService, AlertService
├── controller/    SearchController, ReviewController, AuthController
├── model/         AppUser, Product, Review, ReviewStatus
├── repository/    UserRepository, ProductRepository, ReviewRepository
├── security/      JwtService, JwtAuthFilter
└── scheduler/     PriceRefreshJob
```

---

## 2. Database and Configuration

### docker-compose.yml (project root)

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_DB: pricecompare
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
    ports:
      - "5432:5432"
    volumes:
      - dbdata:/var/lib/postgresql/data
volumes:
  dbdata:
```

Run `docker compose up -d`.

### src/main/resources/application.yml

```yaml
spring:
  threads:
    virtual:
      enabled: true
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/pricecompare}
    username: ${DB_USER:app}
    password: ${DB_PASSWORD:app}
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: validate
  cache:
    type: caffeine
    caffeine:
      spec: maximumSize=1000,expireAfterWrite=15m
  mail:
    host: ${MAIL_HOST:localhost}
    port: ${MAIL_PORT:1025}
    username: ${MAIL_USER:}
    password: ${MAIL_PASSWORD:}

app:
  mock-stores: true
  search-timeout-seconds: 4
  jwt:
    secret: ${JWT_SECRET:change-this-to-a-long-random-string-of-at-least-32-chars}
    expiry-hours: 24
  stores:
    flipkart:
      tracking-id: ${FLIPKART_ID:}
      token: ${FLIPKART_TOKEN:}
```

### src/main/resources/db/migration/V1__init.sql

Offers are fetched live and cached, so there is no `offers` table. Only price *snapshots* are stored, for history charts.

```sql
create table users (
  id bigserial primary key,
  name varchar(100) not null,
  email varchar(255) not null unique,
  password_hash varchar(100) not null,
  created_at timestamptz not null default now()
);

create table products (
  id bigserial primary key,
  product_key varchar(120) not null unique,
  name varchar(300) not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table price_snapshots (
  id bigserial primary key,
  product_id bigint not null references products(id),
  store varchar(50) not null,
  price numeric(12,2) not null,
  captured_at timestamptz not null default now()
);
create index idx_snapshots_product_time on price_snapshots(product_id, captured_at);

create table reviews (
  id bigserial primary key,
  product_id bigint not null references products(id),
  user_id bigint not null references users(id),
  rating int not null check (rating between 1 and 5),
  title varchar(120),
  body text not null,
  status varchar(20) not null default 'APPROVED',
  created_at timestamptz not null default now(),
  unique (product_id, user_id)
);

create table store_ratings (
  id bigserial primary key,
  product_id bigint not null references products(id),
  store varchar(50) not null,
  avg_rating numeric(3,2),
  review_count int,
  last_fetched timestamptz not null default now(),
  unique (product_id, store)
);

create table price_alerts (
  id bigserial primary key,
  user_id bigint not null references users(id),
  product_id bigint not null references products(id),
  target_price numeric(12,2) not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
```

---

## 3. Phase 1: Search and Price Comparison (mock data)

### 3.1 DTOs (`dto` package)

```java
public record Listing(
    String store, String title, BigDecimal price, BigDecimal shipping,
    String url, String imageUrl, boolean inStock, Double rating, Integer ratingCount) {}

public record Offer(
    String store, String title, BigDecimal price, BigDecimal shipping, BigDecimal total,
    String url, String imageUrl, boolean inStock, Double rating, Integer ratingCount,
    boolean bestPrice) {}

public record ProductResult(
    String key, String name, String imageUrl, List<Offer> offers,
    Offer best, BigDecimal savings) {}
```

### 3.2 The connector interface (`connector` package)

```java
public interface StoreConnector {
    String storeName();
    List<Listing> search(String query);
}
```

### 3.3 Mock connector

```java
public class MockStoreConnector implements StoreConnector {

    private record Item(String title, int basePrice) {}

    private static final List<Item> CATALOG = List.of(
        new Item("Sony ULT WEAR WH-ULT900N Wireless Noise Cancelling Headphones Black", 24990),
        new Item("Sony WH-1000XM5 Wireless Noise Cancelling Headphones Black", 29990),
        new Item("boAt Rockerz 551ANC Bluetooth Headphones Black", 2499));

    private final String store;
    private final double factor;
    private final String suffix;

    public MockStoreConnector(String store, double factor, String suffix) {
        this.store = store; this.factor = factor; this.suffix = suffix;
    }

    @Override public String storeName() { return store; }

    @Override
    public List<Listing> search(String query) {
        String[] tokens = query.toLowerCase().trim().split("\\s+");
        return CATALOG.stream()
            .filter(i -> Arrays.stream(tokens).allMatch(t -> i.title().toLowerCase().contains(t)))
            .map(i -> new Listing(
                store, i.title() + suffix,
                BigDecimal.valueOf(i.basePrice() * factor).setScale(0, RoundingMode.HALF_UP),
                BigDecimal.ZERO,
                "https://example.com/" + store.toLowerCase() + "/" + i.title().hashCode(),
                null, true, 4.3, 1200))
            .toList();
    }
}
```

Register the mocks (`config` package):

```java
@Configuration
@ConditionalOnProperty(name = "app.mock-stores", havingValue = "true")
public class MockStoresConfig {
    @Bean StoreConnector mockAmazon()   { return new MockStoreConnector("Amazon", 1.00, " (Amazon)"); }
    @Bean StoreConnector mockFlipkart() { return new MockStoreConnector("Flipkart", 0.87, " - Flipkart"); }
    @Bean StoreConnector mockCroma()    { return new MockStoreConnector("Croma", 0.95, " | Croma"); }
}
```

### 3.4 Parallel search (`service` package)

```java
@Service
@Slf4j
public class SearchService {

    private final List<StoreConnector> connectors;
    private final long timeoutSeconds;
    private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();

    public SearchService(List<StoreConnector> connectors,
                         @Value("${app.search-timeout-seconds}") long timeoutSeconds) {
        this.connectors = connectors;
        this.timeoutSeconds = timeoutSeconds;
    }

    public List<Listing> searchAll(String query) {
        List<CompletableFuture<List<Listing>>> futures = connectors.stream()
            .map(c -> CompletableFuture.supplyAsync(() -> c.search(query), executor)
                .completeOnTimeout(List.of(), timeoutSeconds, TimeUnit.SECONDS)
                .exceptionally(ex -> {
                    log.warn("Store {} failed: {}", c.storeName(), ex.toString());
                    return List.of();
                }))
            .toList();
        return futures.stream().flatMap(f -> f.join().stream()).toList();
    }
}
```

One slow or broken store returns an empty list and never blocks the others.

### 3.5 Matching: grouping the same product across stores

This is the hardest part of the whole project. Start with the model number, because it is the most reliable signal.

```java
@Service
public class MatchingService {

    private static final Pattern MODEL = Pattern.compile("\\b([A-Z]{2,4}-?[A-Z]*\\d{2,}[A-Z0-9]*)\\b");
    private static final List<String> COLOURS =
        List.of("BLACK", "WHITE", "SILVER", "BLUE", "GREY", "GRAY", "RED", "GREEN", "BEIGE");
    private static final Set<String> STOP = Set.of(
        "the", "and", "with", "for", "wireless", "bluetooth", "headphones", "headset", "new");

    public List<ProductResult> group(List<Listing> listings) {
        Map<String, List<Listing>> byKey = listings.stream()
            .collect(Collectors.groupingBy(this::keyOf, LinkedHashMap::new, Collectors.toList()));

        return byKey.entrySet().stream()
            .map(e -> toResult(e.getKey(), e.getValue()))
            .sorted(Comparator.comparing(r -> r.best() == null ? BigDecimal.valueOf(Long.MAX_VALUE) : r.best().total()))
            .toList();
    }

    String keyOf(Listing l) {
        String t = l.title().toUpperCase(Locale.ROOT);
        Matcher m = MODEL.matcher(t);
        if (m.find()) {
            String model = m.group(1).replace("-", "");
            String colour = COLOURS.stream().filter(t::contains).findFirst().orElse(null);
            return colour == null ? model : model + "-" + colour;
        }
        String normalised = Arrays.stream(l.title().toLowerCase().replaceAll("[^a-z0-9 ]", " ").split("\\s+"))
            .filter(w -> !w.isBlank() && !STOP.contains(w))
            .sorted().distinct().collect(Collectors.joining("-"));
        return normalised.length() > 120 ? normalised.substring(0, 120) : normalised;
    }

    private ProductResult toResult(String key, List<Listing> items) {
        List<Offer> offers = items.stream().map(this::toOffer)
            .sorted(Comparator.comparing(Offer::inStock).reversed().thenComparing(Offer::total))
            .toList();

        Offer best = offers.stream().filter(Offer::inStock).findFirst().orElse(null);
        BigDecimal savings = BigDecimal.ZERO;
        if (best != null) {
            BigDecimal max = offers.stream().filter(Offer::inStock)
                .map(Offer::total).max(Comparator.naturalOrder()).orElse(best.total());
            savings = max.subtract(best.total());
        }
        final Offer bestFinal = best;
        List<Offer> flagged = offers.stream()
            .map(o -> new Offer(o.store(), o.title(), o.price(), o.shipping(), o.total(), o.url(),
                o.imageUrl(), o.inStock(), o.rating(), o.ratingCount(), o == bestFinal))
            .toList();

        Listing first = items.get(0);
        return new ProductResult(key, first.title(), first.imageUrl(), flagged,
            flagged.stream().filter(Offer::bestPrice).findFirst().orElse(null), savings);
    }

    private Offer toOffer(Listing l) {
        BigDecimal ship = l.shipping() == null ? BigDecimal.ZERO : l.shipping();
        return new Offer(l.store(), l.title(), l.price(), ship, l.price().add(ship),
            l.url(), l.imageUrl(), l.inStock(), l.rating(), l.ratingCount(), false);
    }
}
```

Known limits to improve later: colour and variant handling, refurbished vs new, seller type, and fuzzy matching for products without a model number. Prefer showing fewer, correct matches over many wrong ones.

### 3.6 Caching facade and controller

Spring caching works through a proxy, so put `@Cacheable` on a separate bean that the controller calls.

```java
@Service
public class SearchFacade {
    private final SearchService searchService;
    private final MatchingService matching;
    private final ProductService products;

    // constructor injection omitted for brevity

    @Cacheable(value = "search", key = "#query.trim().toLowerCase()")
    public List<ProductResult> search(String query) {
        List<ProductResult> results = matching.group(searchService.searchAll(query));
        results.forEach(r -> products.findOrCreate(r.key(), r.name()));
        return results;
    }
}
```

Add `@EnableCaching` on `BackendApplication`.

```java
@RestController
@RequestMapping("/api")
public class SearchController {
    private final SearchFacade facade;

    @GetMapping("/search")
    public List<ProductResult> search(@RequestParam("q") @NotBlank @Size(min = 2, max = 100) String q) {
        return facade.search(q);
    }
}
```

### Checkpoint 1

Run the app and test:

```
curl "http://localhost:8080/api/search?q=sony%20ult"
```

You should see one product (`WHULT900N-BLACK`) with three offers. Flipkart should be cheapest, flagged `bestPrice: true`, with a `savings` amount.

---

## 4. Phase 2: Products and Reviews

### Entities (`model` package)

```java
@Entity @Table(name = "users")
@Getter @Setter @NoArgsConstructor
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String name;
    @Column(unique = true) private String email;
    @Column(name = "password_hash") private String passwordHash;
    @Column(name = "created_at") private Instant createdAt = Instant.now();
}

@Entity @Table(name = "products")
@Getter @Setter @NoArgsConstructor
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name = "product_key", unique = true) private String productKey;
    private String name;
    @Column(name = "image_url") private String imageUrl;
    @Column(name = "created_at") private Instant createdAt = Instant.now();
}

public enum ReviewStatus { PENDING, APPROVED, REJECTED }

@Entity @Table(name = "reviews")
@Getter @Setter @NoArgsConstructor
public class Review {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "product_id") private Product product;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "user_id") private AppUser user;
    private int rating;
    private String title;
    @Column(columnDefinition = "text") private String body;
    @Enumerated(EnumType.STRING) private ReviewStatus status = ReviewStatus.APPROVED;
    @Column(name = "created_at") private Instant createdAt = Instant.now();
}
```

### Repositories

```java
public interface UserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByEmail(String email);
    boolean existsByEmail(String email);
}

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductKey(String productKey);
}

public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByProductIdAndUserId(Long productId, Long userId);
    List<Review> findByProductIdAndStatusOrderByCreatedAtDesc(Long productId, ReviewStatus status);

    @Query("select avg(r.rating), count(r) from Review r where r.product.id = :pid and r.status = 'APPROVED'")
    List<Object[]> summary(@Param("pid") Long productId);
}
```

### Services

```java
@Service
public class ProductService {
    private final ProductRepository repo;

    @Transactional
    public Product findOrCreate(String key, String name) {
        return repo.findByProductKey(key).orElseGet(() -> {
            Product p = new Product();
            p.setProductKey(key);
            p.setName(name);
            return repo.save(p);
        });
    }
}

public record ReviewRequest(
    @Min(1) @Max(5) int rating,
    @Size(max = 120) String title,
    @NotBlank @Size(max = 4000) String body) {}

public record ReviewView(Long id, String author, int rating, String title, String body, Instant createdAt) {}

@Service
public class ReviewService {
    private final ReviewRepository reviews;
    private final ProductRepository products;
    private final UserRepository users;

    // constructor injection omitted

    @Transactional
    public ReviewView add(String productKey, String email, ReviewRequest req) {
        Product p = products.findByProductKey(productKey)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown product"));
        AppUser u = users.findByEmail(email).orElseThrow();
        if (reviews.existsByProductIdAndUserId(p.getId(), u.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You already reviewed this product");
        }
        Review r = new Review();
        r.setProduct(p); r.setUser(u);
        r.setRating(req.rating()); r.setTitle(req.title()); r.setBody(req.body());
        return toView(reviews.save(r));
    }

    @Transactional(readOnly = true)
    public List<ReviewView> list(String productKey) {
        Product p = products.findByProductKey(productKey)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown product"));
        return reviews.findByProductIdAndStatusOrderByCreatedAtDesc(p.getId(), ReviewStatus.APPROVED)
            .stream().map(this::toView).toList();
    }

    private ReviewView toView(Review r) {
        return new ReviewView(r.getId(), r.getUser().getName(), r.getRating(),
            r.getTitle(), r.getBody(), r.getCreatedAt());
    }
}
```

### Controller

```java
@RestController
@RequestMapping("/api/products/{key}/reviews")
public class ReviewController {
    private final ReviewService service;

    @GetMapping
    public List<ReviewView> list(@PathVariable String key) { return service.list(key); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewView add(@PathVariable String key, @Valid @RequestBody ReviewRequest req,
                          Authentication auth) {
        return service.add(key, auth.getName(), req);
    }
}
```

---

## 5. Phase 3: Accounts and Security (JWT)

### JwtService

```java
@Service
public class JwtService {
    private final SecretKey key;
    private final long expiryHours;

    public JwtService(@Value("${app.jwt.secret}") String secret,
                      @Value("${app.jwt.expiry-hours}") long expiryHours) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expiryHours = expiryHours;
    }

    public String create(String email) {
        Instant now = Instant.now();
        return Jwts.builder().subject(email)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(expiryHours, ChronoUnit.HOURS)))
            .signWith(key).compact();
    }

    public String emailOrNull(String token) {
        try {
            return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload().getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}
```

### JwtAuthFilter

```java
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtService jwt;

    public JwtAuthFilter(JwtService jwt) { this.jwt = jwt; }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String email = jwt.emailOrNull(header.substring(7));
            if (email != null) {
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(email, null, List.of()));
            }
        }
        chain.doFilter(req, res);
    }
}
```

### SecurityConfig

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain chain(HttpSecurity http, JwtAuthFilter jwtFilter) throws Exception {
        http.csrf(c -> c.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a -> a
                .requestMatchers(HttpMethod.GET, "/api/search", "/api/products/**").permitAll()
                .requestMatchers("/api/auth/**", "/swagger-ui/**", "/v3/api-docs/**", "/actuator/health").permitAll()
                .anyRequest().authenticated())
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}
```

### AuthController

```java
public record RegisterRequest(@NotBlank String name, @Email @NotBlank String email,
                              @Size(min = 8, max = 72) String password) {}
public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}
public record TokenResponse(String token, String name) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    @PostMapping("/register")
    public TokenResponse register(@Valid @RequestBody RegisterRequest r) {
        if (users.existsByEmail(r.email()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        AppUser u = new AppUser();
        u.setName(r.name()); u.setEmail(r.email());
        u.setPasswordHash(encoder.encode(r.password()));
        users.save(u);
        return new TokenResponse(jwt.create(u.getEmail()), u.getName());
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest r) {
        AppUser u = users.findByEmail(r.email())
            .filter(x -> encoder.matches(r.password(), x.getPasswordHash()))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        return new TokenResponse(jwt.create(u.getEmail()), u.getName());
    }
}
```

### CORS (so the React frontend can call the API)

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173")
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*");
    }
}
```

### Checkpoint 2

```
curl -X POST localhost:8080/api/auth/register -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'

curl localhost:8080/api/search?q=sony%20ult        # creates the product
curl -X POST localhost:8080/api/products/WHULT900N-BLACK/reviews \
  -H "Authorization: Bearer <token>" -H "Content-Type: application/json" \
  -d '{"rating":5,"title":"Great","body":"Excellent noise cancelling"}'
curl localhost:8080/api/products/WHULT900N-BLACK/reviews
```

A second review from the same user should return 409.

---

## 6. Phase 4: Real Store Connectors

Each real connector is just another `StoreConnector` bean. The rest of the app doesn't change.

### Flipkart (affiliate API)

The field names below come from older community documentation. **Check them against the official docs** (affiliate.flipkart.com/api-docs) before relying on them.

```java
@Component
@ConditionalOnExpression("!'${app.stores.flipkart.token:}'.isEmpty()")
public class FlipkartConnector implements StoreConnector {

    private final RestClient client;

    public FlipkartConnector(@Value("${app.stores.flipkart.tracking-id}") String trackingId,
                             @Value("${app.stores.flipkart.token}") String token) {
        this.client = RestClient.builder()
            .baseUrl("https://affiliate-api.flipkart.net/affiliate")
            .defaultHeader("Fk-Affiliate-Id", trackingId)
            .defaultHeader("Fk-Affiliate-Token", token)
            .build();
    }

    @Override public String storeName() { return "Flipkart"; }

    @Override
    public List<Listing> search(String query) {
        JsonNode root = client.get()
            .uri(u -> u.path("/1.0/search.json").queryParam("query", query).queryParam("resultCount", 10).build())
            .retrieve().body(JsonNode.class);

        List<Listing> out = new ArrayList<>();
        for (JsonNode p : root.path("products")) {
            JsonNode info = p.path("productBaseInfoV1");
            BigDecimal price = info.path("flipkartSellingPrice").path("amount").decimalValue();
            if (price.signum() == 0) continue;
            out.add(new Listing("Flipkart", info.path("title").asText(), price, BigDecimal.ZERO,
                info.path("productUrl").asText(),          // already an affiliate link
                info.path("imageUrls").path("400x400").asText(null),
                info.path("inStock").asBoolean(true), null, null));
        }
        return out;
    }
}
```

Turn off mocks once real data is in: `app.mock-stores: false`. You can also keep mocks for stores you don't have yet.

### Amazon (Creators API)

Amazon's Creators API uses OAuth2: you create an application and credentials in Associates Central (Tools, then Creators API), request an access token, then call the catalogue search operation. Follow Amazon's current Creators API documentation for the exact endpoints, since credentials are region-scoped and details have changed recently.

Create `AmazonConnector implements StoreConnector` the same way as Flipkart: fetch and cache the OAuth token, call search, map results into `Listing`, and use your associate-tagged product links.

If you aren't eligible yet, keep Amazon as a mock or as a link-out to a search results page with your associate tag, and say clearly in the UI that no live price is shown.

### Other stores and optional extras

- Indian affiliate networks (Cuelinks, vCommission, EarnKaro, INRDeals) can supply feeds or deep links for more stores. Check each one's terms.
- A SERP API that returns the Google Shopping block can be an optional connector for prototyping. Google does not offer an official API for this and sued one such provider (SerpApi) in December 2025, so treat it as a temporary extra source, not the foundation of a launched product.
- **Do not scrape store websites.** It breaks constantly and violates their terms.

### Resilience (optional but recommended)

Add `resilience4j-spring-boot3` and `spring-boot-starter-aop`, then annotate real connectors:

```java
@CircuitBreaker(name = "flipkart", fallbackMethod = "fallback")
@Override
public List<Listing> search(String query) { ... }

private List<Listing> fallback(String query, Throwable t) { return List.of(); }
```

```yaml
resilience4j:
  circuitbreaker:
    instances:
      flipkart:
        slidingWindowSize: 10
        failureRateThreshold: 50
        waitDurationInOpenState: 30s
```

---

## 7. Phase 5: Price History and Alerts

### Price refresh job

```java
@Component
@EnableScheduling
@Slf4j
public class PriceRefreshJob {
    private final JdbcTemplate jdbc;
    private final SearchService search;
    private final MatchingService matching;
    private final JavaMailSender mail;

    @Scheduled(cron = "0 0 */6 * * *")   // every 6 hours
    public void refreshTrackedProducts() {
        // Only products with an active alert, so API usage stays small
        List<Map<String, Object>> tracked = jdbc.queryForList("""
            select distinct p.id, p.product_key, p.name
            from products p join price_alerts a on a.product_id = p.id
            where a.active = true""");

        for (Map<String, Object> row : tracked) {
            long productId = ((Number) row.get("id")).longValue();
            String key = (String) row.get("product_key");
            String name = (String) row.get("name");

            matching.group(search.searchAll(name)).stream()
                .filter(r -> r.key().equals(key)).findFirst()
                .ifPresent(r -> {
                    r.offers().stream().filter(Offer::inStock).forEach(o -> jdbc.update(
                        "insert into price_snapshots(product_id, store, price) values (?,?,?)",
                        productId, o.store(), o.total()));
                    if (r.best() != null) notifyIfTargetHit(productId, name, r.best());
                });
        }
    }

    private void notifyIfTargetHit(long productId, String name, Offer best) {
        jdbc.query("""
            select a.id, u.email, a.target_price from price_alerts a
            join users u on u.id = a.user_id
            where a.product_id = ? and a.active = true and a.target_price >= ?""",
            rs -> {
                SimpleMailMessage m = new SimpleMailMessage();
                m.setTo(rs.getString("email"));
                m.setSubject("Price drop: " + name);
                m.setText(name + " is now Rs " + best.total() + " on " + best.store()
                    + ".\nBuy: " + best.url());
                mail.send(m);
                jdbc.update("update price_alerts set active = false where id = ?", rs.getLong("id"));
            }, productId, best.total());
    }
}
```

Add endpoints:
- `POST /api/alerts` with `{productKey, targetPrice}` creates an alert (login required)
- `GET /api/products/{key}/history` returns snapshots grouped by store, for a line chart

For local email testing, run MailHog or Mailpit in Docker (SMTP on port 1025). For production use a free-tier email provider (Brevo, Resend, SendGrid).

---

## 8. Phase 6: Frontend (React + Vite)

```
npm create vite@latest frontend -- --template react
cd frontend && npm install && npm run dev      # http://localhost:5173
```

Pages:
1. **Home / search**: a search box that calls `GET /api/search?q=`
2. **Results + product page**: a comparison table (store, price, shipping, total, Buy button), with the cheapest row badged "Best price: save Rs X". Below it, the reviews list, average rating and a "write a review" form (shown when logged in).
3. **Login / register**
4. **Price history chart**: use Recharts or Chart.js

Minimal search call:

```jsx
const [results, setResults] = useState([]);
async function search(q) {
  const res = await fetch(`http://localhost:8080/api/search?q=${encodeURIComponent(q)}`);
  setResults(await res.json());
}
```

Store the JWT after login and send it as `Authorization: Bearer <token>` on review and alert calls.

UI details that matter:
- Show "last updated" time and a note that prices can change.
- Show each store's rating and review count next to its offer, and link out to read store reviews there. **Never copy store review text.**
- Add an affiliate disclosure near the Buy buttons.

---

## 9. Testing

Matching logic deserves unit tests, because wrong matches destroy trust:

```java
class MatchingServiceTest {
    private final MatchingService matching = new MatchingService();

    private Listing l(String store, String title, int price) {
        return new Listing(store, title, BigDecimal.valueOf(price), BigDecimal.ZERO,
            "http://x", null, true, null, null);
    }

    @Test
    void sameModelAcrossStoresGroupsTogetherAndPicksCheapest() {
        var results = matching.group(List.of(
            l("Amazon", "Sony ULT WEAR WH-ULT900N Wireless Headphones (Black)", 15000),
            l("Flipkart", "SONY ULT Wear WH-ULT900N Bluetooth Headset Black", 13000)));

        assertEquals(1, results.size());
        assertEquals("Flipkart", results.get(0).best().store());
        assertEquals(0, BigDecimal.valueOf(2000).compareTo(results.get(0).savings()));
    }

    @Test
    void differentColoursAreNotMerged() {
        var results = matching.group(List.of(
            l("Amazon", "Sony WH-1000XM5 Headphones Black", 29000),
            l("Flipkart", "Sony WH-1000XM5 Headphones Silver", 27000)));
        assertEquals(2, results.size());
    }
}
```

Also add:
- A test with `@WebMvcTest` for the search controller
- A review-service test checking the one-review-per-user rule
- Testcontainers (PostgreSQL) for repository tests

---

## 10. Deployment (free-tier friendly)

### Dockerfile

```dockerfile
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Free options (check current limits before committing)

| Part | Options |
|---|---|
| Backend | Oracle Cloud Always Free VM (best for Java), or Render / Railway / Fly.io free or trial tiers |
| PostgreSQL | Supabase, Neon, Aiven free tiers |
| Frontend | Vercel, Netlify, Cloudflare Pages |
| Email | Brevo, Resend, SendGrid free tiers |
| Domain | Free subdomain from the host first, buy a domain at launch (roughly Rs 700-1000 a year) |

Set environment variables on the host: `DB_URL`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET` (long and random), `FLIPKART_ID`, `FLIPKART_TOKEN`, mail settings. Free servers can sleep when idle, so the first request after a pause is slow.

Making the free tier last:
- Cache searches for 10-30 minutes (already configured)
- Refresh prices only for products people track or view
- Start with one category, such as headphones

---

## 11. Before You Launch

- [ ] Affiliate links on every Buy button, plus an **affiliate disclosure** on the site
- [ ] Privacy policy and terms of use (you store emails and passwords)
- [ ] Rate limiting on search and review endpoints (e.g. Bucket4j) to stop abuse
- [ ] Review moderation: profanity filter, a report button, a `PENDING` status flow for flagged reviews
- [ ] No scraping and no copied store reviews
- [ ] Secrets only in environment variables, never in Git
- [ ] Monitoring through Actuator health checks and basic logs
- [ ] A clear "prices may change, check the store before buying" note

---

## 12. Order of Work (suggested timeline)

| Week | Goal |
|---|---|
| 1 | Project setup, database, mock connectors, `/api/search` working (Checkpoint 1) |
| 2 | Matching improvements and tests, caching |
| 3 | Accounts, JWT, reviews (Checkpoint 2) |
| 4-5 | React frontend: search, comparison table, product page, reviews |
| 6 | Real Flipkart connector, then Amazon when eligible |
| 7 | Price snapshots, history chart, alerts and email |
| 8 | Moderation, rate limiting, affiliate links, disclosures |
| 9 | Dockerize, deploy, invite early users |

---

## 13. Future Ideas

- Include bank offers and coupons in the effective price
- More categories and more stores
- Verified-buyer badges and review photos
- A mobile app (Flutter or React Native) on the same API
- A "good time to buy?" indicator from price history
- Embedding-based product matching for items without model numbers
