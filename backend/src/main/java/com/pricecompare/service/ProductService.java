package com.pricecompare.service;

import com.pricecompare.model.Product;
import com.pricecompare.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {
    private final ProductRepository repo;
    public ProductService(ProductRepository repo) { this.repo = repo; }

    @Transactional
    public Product findOrCreate(String key, String name) {
        return repo.findByProductKey(key).orElseGet(() -> {
            Product p = new Product();
            p.setProductKey(key);
            p.setName(name);
            return repo.save(p);
        });
    }
}