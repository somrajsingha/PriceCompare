package com.pricecompare.dto;

import jakarta.validation.constraints.*;

public record ReviewRequest(
    @Min(1) @Max(5) int rating,
    @Size(max = 120) String title,
    @NotBlank @Size(max = 4000) String body) {}
