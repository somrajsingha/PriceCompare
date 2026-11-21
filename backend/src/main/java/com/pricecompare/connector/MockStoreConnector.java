package com.pricecompare.connector;

import com.pricecompare.dto.Listing;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

public class MockStoreConnector implements StoreConnector {

    public record Item(
        String title,
        String category,
        String brand,
        int basePrice,
        String imageUrl,
        double rating,
        int ratingCount
    ) {}

    public static final List<Item> CATALOG = List.of(
        // --- SMARTPHONES ---
        new Item(
            "Apple iPhone 15 128GB Black",
            "Mobiles", "Apple", 69900,
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
            4.6, 14200
        ),
        new Item(
            "Apple iPhone 15 Pro 128GB Natural Titanium",
            "Mobiles", "Apple", 129800,
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
            4.8, 9800
        ),
        new Item(
            "Samsung Galaxy S24 Ultra 5G 256GB Titanium Gray",
            "Mobiles", "Samsung", 129999,
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80",
            4.7, 8500
        ),
        new Item(
            "Samsung Galaxy S24 5G 128GB Onyx Black",
            "Mobiles", "Samsung", 74999,
            "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
            4.5, 6200
        ),
        new Item(
            "OnePlus 12 5G 256GB Silky Black",
            "Mobiles", "OnePlus", 64999,
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
            4.6, 7300
        ),
        new Item(
            "Google Pixel 8 128GB Obsidian Black",
            "Mobiles", "Google", 62999,
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
            4.4, 4800
        ),
        new Item(
            "Xiaomi Redmi Note 13 Pro 5G 256GB Midnight Black",
            "Mobiles", "Xiaomi", 24999,
            "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&auto=format&fit=crop&q=80",
            4.3, 11500
        ),

        // --- LAPTOPS & COMPUTING ---
        new Item(
            "Apple MacBook Air M3 Chip 13-inch 8GB 256GB Midnight",
            "Laptops", "Apple", 114900,
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80",
            4.8, 5100
        ),
        new Item(
            "Dell XPS 13 Intel Core i7 16GB 512GB SSD Platinum",
            "Laptops", "Dell", 119990,
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80",
            4.5, 3400
        ),
        new Item(
            "HP Pavilion 15 Intel Core i5 16GB 512GB SSD Silver",
            "Laptops", "HP", 65490,
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
            4.3, 8900
        ),
        new Item(
            "ASUS ROG Zephyrus G14 AMD Ryzen 9 16GB 1TB RTX 4060 Eclipse Gray",
            "Laptops", "ASUS", 149990,
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
            4.7, 2600
        ),
        new Item(
            "Lenovo IdeaPad Slim 5 AMD Ryzen 7 16GB 512GB SSD Cloud Grey",
            "Laptops", "Lenovo", 62990,
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
            4.4, 4300
        ),

        // --- SMART TVS ---
        new Item(
            "Sony Bravia 55 inch 4K Ultra HD Smart LED Google TV KD-55X74L",
            "Televisions", "Sony", 57990,
            "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80",
            4.6, 6800
        ),
        new Item(
            "Samsung 55 inch Crystal 4K Vivid Pro Ultra HD Smart TV UA55CUE70AKLXL",
            "Televisions", "Samsung", 43990,
            "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop&q=80",
            4.4, 9100
        ),
        new Item(
            "LG 55 inch 4K OLED evo Smart TV OLED55C3PSA",
            "Televisions", "LG", 119990,
            "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=600&auto=format&fit=crop&q=80",
            4.8, 3100
        ),

        // --- SMARTWATCHES & WEARABLES ---
        new Item(
            "Apple Watch Series 9 GPS 45mm Midnight Aluminum Sport Band",
            "Smartwatches", "Apple", 44900,
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
            4.7, 7600
        ),
        new Item(
            "Samsung Galaxy Watch 6 Bluetooth 44mm Graphite",
            "Smartwatches", "Samsung", 29999,
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
            4.5, 4100
        ),
        new Item(
            "OnePlus Watch 2 Stainless Steel Radiant Silver",
            "Smartwatches", "OnePlus", 24999,
            "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80",
            4.4, 2800
        ),
        new Item(
            "Noise ColorFit Pro 5 Smart Watch Jet Black",
            "Smartwatches", "Noise", 3999,
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
            4.2, 18900
        ),

        // --- TABLETS ---
        new Item(
            "Apple iPad 10th Gen 10.9-inch Wi-Fi 64GB Blue",
            "Tablets", "Apple", 34900,
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
            4.7, 9300
        ),
        new Item(
            "Samsung Galaxy Tab S9 FE 10.9-inch 128GB Gray",
            "Tablets", "Samsung", 36999,
            "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80",
            4.5, 3700
        ),

        // --- HEADPHONES & AUDIO ---
        new Item(
            "Sony ULT WEAR WH-ULT900N Wireless Noise Cancelling Headphones Black",
            "Headphones", "Sony", 24990,
            "assets/images/sony_ult_angle.jpg",
            4.3, 3926
        ),
        new Item(
            "Sony WH-1000XM5 Wireless Noise Cancelling Headphones Black",
            "Headphones", "Sony", 29990,
            "assets/images/sony_xm5.jpg",
            4.6, 8420
        ),
        new Item(
            "Apple AirPods Pro 2nd Generation with MagSafe Case USB-C",
            "Headphones", "Apple", 24900,
            "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop&q=80",
            4.8, 16400
        ),
        new Item(
            "boAt Rockerz 551ANC Bluetooth Headphones Black",
            "Headphones", "boAt", 7990,
            "assets/images/boat_rockerz.jpg",
            4.1, 12850
        ),
        new Item(
            "JBL Flip 6 Portable Waterproof Bluetooth Speaker Black",
            "Audio", "JBL", 11999,
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
            4.5, 9400
        ),

        // --- GAMING CONSOLES ---
        new Item(
            "Sony PlayStation 5 Slim Console Disc Edition White",
            "Gaming", "Sony", 54990,
            "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop&q=80",
            4.8, 8900
        ),
        new Item(
            "Microsoft Xbox Series X 1TB Console Black",
            "Gaming", "Microsoft", 52990,
            "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&auto=format&fit=crop&q=80",
            4.7, 4300
        )
    );

    private final String store;
    private final double factor;
    private final double shippingCost;

    public MockStoreConnector(String store, double factor, double shippingCost) {
        this.store = store;
        this.factor = factor;
        this.shippingCost = shippingCost;
    }

    @Override
    public String storeName() {
        return store;
    }

    @Override
    public List<Listing> search(String query) {
        String cleanQuery = query == null ? "" : query.toLowerCase().trim();
        List<Item> candidates;

        if (cleanQuery.isBlank() || cleanQuery.equals("all") || cleanQuery.equals("electronics")) {
            candidates = CATALOG;
        } else {
            String[] tokens = cleanQuery.split("\\s+");
            candidates = CATALOG.stream()
                .filter(i -> {
                    String searchable = (i.title() + " " + i.category() + " " + i.brand()).toLowerCase();
                    return Arrays.stream(tokens).allMatch(searchable::contains);
                })
                .toList();
        }

        return candidates.stream()
            .map(i -> {
                // Calculate store specific price variance:
                // Base price * store factor, rounded nicely to standard Indian e-commerce pricing
                long rawPrice = Math.round(i.basePrice() * factor);
                // Adjust store specific subtle variation
                long storePrice = switch (store.toLowerCase()) {
                    case "jiomart" -> Math.round(rawPrice * 0.98 / 10.0) * 10 - 1; // e.g. .99 or .89
                    case "flipkart" -> Math.round(rawPrice / 10.0) * 10 - 1;
                    case "croma" -> Math.round(rawPrice * 1.01 / 10.0) * 10;
                    default -> rawPrice;
                };

                BigDecimal price = BigDecimal.valueOf(Math.max(storePrice, 999));
                String targetUrl = buildStoreUrl(store, i.title());

                return new Listing(
                    store,
                    i.title(),
                    price,
                    BigDecimal.valueOf(shippingCost),
                    targetUrl,
                    i.imageUrl(),
                    true,
                    i.rating(),
                    i.ratingCount()
                );
            })
            .toList();
    }

    private String buildStoreUrl(String store, String title) {
        String encoded = URLEncoder.encode(title, StandardCharsets.UTF_8);
        return switch (store.toLowerCase()) {
            case "amazon" -> "https://www.amazon.in/s?k=" + encoded;
            case "flipkart" -> "https://www.flipkart.com/search?q=" + encoded;
            case "jiomart" -> "https://www.jiomart.com/search/" + encoded;
            case "croma" -> "https://www.croma.com/searchB?q=" + encoded;
            default -> "https://example.com/" + store.toLowerCase() + "?q=" + encoded;
        };
    }
}