package com.pricecompare.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductResult(
    String key, String name, String imageUrl, List<Offer> offers,
    Offer best, BigDecimal savings) {}
