package com.pricecompare.matching;

import com.pricecompare.dto.*;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

@Service
public class MatchingService {

    private static final Pattern MODEL = Pattern.compile("\\b([A-Z]{2,4}-?[A-Z]*\\d{2,}[A-Z0-9]*)\\b");
    private static final List<String> COLOURS =
        List.of("BLACK", "WHITE", "SILVER", "BLUE", "GREY", "GRAY", "RED", "GREEN", "BEIGE", "GOLD", "TITANIUM");
    private static final Set<String> STOP = Set.of(
        "the", "and", "with", "for", "new", "buy", "online", "india", "official",
        "amazon", "flipkart", "croma", "jiomart", "store", "deal", "special", "edition");

    public List<ProductResult> group(List<Listing> listings) {
        Map<String, List<Listing>> byKey = listings.stream()
            .collect(Collectors.groupingBy(this::keyOf, LinkedHashMap::new, Collectors.toList()));
        return byKey.entrySet().stream()
            .map(e -> toResult(e.getKey(), e.getValue()))
            .sorted(Comparator.comparing(r -> r.best() == null
                ? BigDecimal.valueOf(Long.MAX_VALUE) : r.best().total()))
            .toList();
    }

    public String keyOf(Listing l) {
        String t = l.title().toUpperCase(Locale.ROOT);
        Matcher m = MODEL.matcher(t);
        if (m.find()) {
            String model = m.group(1).replace("-", "");
            String colour = COLOURS.stream().filter(t::contains).findFirst().orElse(null);
            return colour == null ? model : model + "-" + colour;
        }
        String normalised = Arrays.stream(
            l.title().toLowerCase().replaceAll("[^a-z0-9 ]", " ").split("\\s+"))
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