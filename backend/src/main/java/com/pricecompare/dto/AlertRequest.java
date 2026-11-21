package com.pricecompare.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record AlertRequest(
    @NotBlank String productKey,
    @NotNull @Positive BigDecimal targetPrice) {}
