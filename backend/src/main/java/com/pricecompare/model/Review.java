package com.pricecompare.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private AppUser user;

    private int rating;

    private String title;

    @Column(columnDefinition = "text")
    private String body;

    @Enumerated(EnumType.STRING)
    private ReviewStatus status = ReviewStatus.APPROVED;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public Review() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBody() { return body; }
    public void setBody(String body) { this.body = body; }

    public ReviewStatus getStatus() { return status; }
    public void setStatus(ReviewStatus status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}