package com.pricecompare.controller;

import com.pricecompare.dto.AlertRequest;
import com.pricecompare.service.AlertService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alerts")
public class AlertController {
    private final AlertService service;
    public AlertController(AlertService service) { this.service = service; }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@Valid @RequestBody AlertRequest req, Authentication auth) {
        service.create(auth.getName(), req);
    }
}