package com.pricecompare.controller;

import com.pricecompare.dto.*;
import com.pricecompare.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products/{key}/reviews")
public class ReviewController {
    private final ReviewService service;
    public ReviewController(ReviewService service) { this.service = service; }

    @GetMapping
    public List<ReviewView> list(@PathVariable String key) { return service.list(key); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReviewView add(@PathVariable String key,
                          @Valid @RequestBody ReviewRequest req,
                          Authentication auth) {
        return service.add(key, auth.getName(), req);
    }
}