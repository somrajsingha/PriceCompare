package com.pricecompare.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_key", unique = true)
    private String productKey;

    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public Product() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductKey() { return productKey; }
    public void setProductKey(String productKey) { this.productKey = productKey; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}