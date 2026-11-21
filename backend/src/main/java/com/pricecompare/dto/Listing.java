package com.pricecompare.dto;

import java.math.BigDecimal;

public record Listing(
    String store, String title, BigDecimal price, BigDecimal shipping,
    String url, String imageUrl, boolean inStock, Double rating, Integer ratingCount) {}
