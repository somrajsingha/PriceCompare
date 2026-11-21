package com.pricecompare.dto;

import java.time.Instant;

public record ReviewView(Long id, String author, int rating, String title, String body, Instant createdAt) {}
