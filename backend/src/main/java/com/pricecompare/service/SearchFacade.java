package com.pricecompare.service;

import com.pricecompare.dto.ProductResult;
import com.pricecompare.matching.MatchingService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SearchFacade {
    private final SearchService searchService;
    private final MatchingService matching;
    private final ProductService products;

    public SearchFacade(SearchService searchService, MatchingService matching, ProductService products) {
        this.searchService = searchService; this.matching = matching; this.products = products;
    }

    @Cacheable(value = "search", key = "#query.trim().toLowerCase()")
    public List<ProductResult> search(String query) {
        List<ProductResult> results = matching.group(searchService.searchAll(query));
        results.forEach(r -> products.findOrCreate(r.key(), r.name()));
        return results;
    }
}