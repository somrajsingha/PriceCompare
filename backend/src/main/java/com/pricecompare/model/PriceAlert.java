package com.pricecompare.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "price_alerts")
public class PriceAlert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "target_price")
    private BigDecimal targetPrice;

    private boolean active = true;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    public PriceAlert() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public BigDecimal getTargetPrice() { return targetPrice; }
    public void setTargetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}