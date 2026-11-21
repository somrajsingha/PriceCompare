package com.pricecompare.service;

import com.pricecompare.connector.StoreConnector;
import com.pricecompare.dto.Listing;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.concurrent.*;

@Service
public class SearchService {
    private static final Logger log = LoggerFactory.getLogger(SearchService.class);

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