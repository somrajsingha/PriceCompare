package com.pricecompare.repository;

import com.pricecompare.model.Review;
import com.pricecompare.model.ReviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    boolean existsByProductIdAndUserId(Long productId, Long userId);
    List<Review> findByProductIdAndStatusOrderByCreatedAtDesc(Long productId, ReviewStatus status);

    @Query("select avg(r.rating), count(r) from Review r where r.product.id = :pid and r.status = 'APPROVED'")
    List<Object[]> summary(@Param("pid") Long productId);
}