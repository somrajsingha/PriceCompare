package com.pricecompare.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtService {
    private final SecretKey key;
    private final long expiryHours;

    public JwtService(@Value("${app.jwt.secret}") String secret,
                      @Value("${app.jwt.expiry-hours}") long expiryHours) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expiryHours = expiryHours;
    }

    public String create(String email) {
        Instant now = Instant.now();
        return Jwts.builder().subject(email)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plus(expiryHours, ChronoUnit.HOURS)))
            .signWith(key).compact();
    }

    public String emailOrNull(String token) {
        try {
            return Jwts.parser().verifyWith(key).build()
                .parseSignedClaims(token).getPayload().getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }
}