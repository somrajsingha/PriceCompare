package com.pricecompare;

import com.pricecompare.dto.Listing;
import com.pricecompare.matching.MatchingService;
import org.junit.jupiter.api.Test;
import java.math.BigDecimal;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class MatchingServiceTest {
    private final MatchingService matching = new MatchingService();

    private Listing l(String store, String title, int price) {
        return new Listing(store, title, BigDecimal.valueOf(price), BigDecimal.ZERO,
            "http://x", null, true, null, null);
    }

    @Test
    void fourStoreElectronicsComparisonGroupsTogetherAndFindsBestPrice() {
        var results = matching.group(List.of(
            l("Amazon",   "Apple iPhone 15 128GB Black (Amazon)", 56499),
            l("Flipkart", "Apple iPhone 15 128GB Black - Flipkart", 55999),
            l("JioMart",  "Apple iPhone 15 128GB Black | JioMart", 54990),
            l("Croma",    "Apple iPhone 15 128GB Black | Croma", 57990)));

        assertEquals(1, results.size());
        assertEquals("JioMart", results.get(0).best().store());
        assertEquals(4, results.get(0).offers().size());
        assertEquals(0, BigDecimal.valueOf(3000).compareTo(results.get(0).savings()));
    }

    @Test
    void laptopAndTvModelsGroupProperly() {
        var results = matching.group(List.of(
            l("Amazon",   "Apple MacBook Air M3 Chip 13-inch 8GB 256GB Midnight", 102490),
            l("Flipkart", "Apple MacBook Air M3 Chip 13-inch 8GB 256GB Midnight", 99990),
            l("JioMart",  "Apple MacBook Air M3 Chip 13-inch 8GB 256GB Midnight", 101490),
            l("Croma",    "Apple MacBook Air M3 Chip 13-inch 8GB 256GB Midnight", 103990)));

        assertEquals(1, results.size());
        assertEquals("Flipkart", results.get(0).best().store());
        assertEquals(0, BigDecimal.valueOf(4000).compareTo(results.get(0).savings()));
    }

    @Test
    void differentColoursAreNotMerged() {
        var results = matching.group(List.of(
            l("Amazon",   "Sony WH-1000XM5 Headphones Black",  29000),
            l("Flipkart", "Sony WH-1000XM5 Headphones Silver", 27000)));
        assertEquals(2, results.size());
    }
}
