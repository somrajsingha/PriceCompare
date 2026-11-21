package com.pricecompare.service;

import com.pricecompare.dto.AlertRequest;
import com.pricecompare.model.*;
import com.pricecompare.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AlertService {
    private final PriceAlertRepository alerts;
    private final ProductRepository products;
    private final UserRepository users;

    public AlertService(PriceAlertRepository alerts, ProductRepository products, UserRepository users) {
        this.alerts = alerts; this.products = products; this.users = users;
    }

    @Transactional
    public void create(String email, AlertRequest req) {
        AppUser u = users.findByEmail(email).orElseThrow();
        Product p = products.findByProductKey(req.productKey())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown product"));
        PriceAlert alert = new PriceAlert();
        alert.setUser(u); alert.setProduct(p); alert.setTargetPrice(req.targetPrice());
        alerts.save(alert);
    }
}