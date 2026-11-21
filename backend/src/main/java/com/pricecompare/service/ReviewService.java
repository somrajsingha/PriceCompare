package com.pricecompare.service;

import com.pricecompare.dto.ReviewRequest;
import com.pricecompare.dto.ReviewView;
import com.pricecompare.model.*;
import com.pricecompare.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviews;
    private final ProductRepository products;
    private final UserRepository users;

    public ReviewService(ReviewRepository reviews, ProductRepository products, UserRepository users) {
        this.reviews = reviews; this.products = products; this.users = users;
    }

    @Transactional
    public ReviewView add(String productKey, String email, ReviewRequest req) {
        Product p = products.findByProductKey(productKey)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown product"));
        AppUser u = users.findByEmail(email).orElseThrow();
        if (reviews.existsByProductIdAndUserId(p.getId(), u.getId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "You already reviewed this product");
        }
        Review r = new Review();
        r.setProduct(p); r.setUser(u);
        r.setRating(req.rating()); r.setTitle(req.title()); r.setBody(req.body());
        return toView(reviews.save(r));
    }

    @Transactional(readOnly = true)
    public List<ReviewView> list(String productKey) {
        Product p = products.findByProductKey(productKey)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Unknown product"));
        return reviews.findByProductIdAndStatusOrderByCreatedAtDesc(p.getId(), ReviewStatus.APPROVED)
            .stream().map(this::toView).toList();
    }

    private ReviewView toView(Review r) {
        return new ReviewView(r.getId(), r.getUser().getName(), r.getRating(),
            r.getTitle(), r.getBody(), r.getCreatedAt());
    }
}