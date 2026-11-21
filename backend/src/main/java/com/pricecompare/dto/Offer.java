package com.pricecompare.dto;

import java.math.BigDecimal;

public record Offer(
    String store, String title, BigDecimal price, BigDecimal shipping, BigDecimal total,
    String url, String imageUrl, boolean inStock, Double rating, Integer ratingCount,
    boolean bestPrice) {}
