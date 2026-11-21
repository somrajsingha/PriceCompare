package com.pricecompare.repository;

import com.pricecompare.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByProductKey(String productKey);
}