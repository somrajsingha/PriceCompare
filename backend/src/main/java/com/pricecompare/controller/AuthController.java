package com.pricecompare.controller;

import com.pricecompare.dto.*;
import com.pricecompare.model.AppUser;
import com.pricecompare.repository.UserRepository;
import com.pricecompare.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtService jwt;

    public AuthController(UserRepository users, PasswordEncoder encoder, JwtService jwt) {
        this.users = users; this.encoder = encoder; this.jwt = jwt;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public TokenResponse register(@Valid @RequestBody RegisterRequest r) {
        if (users.existsByEmail(r.email()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        AppUser u = new AppUser();
        u.setName(r.name()); u.setEmail(r.email());
        u.setPasswordHash(encoder.encode(r.password()));
        users.save(u);
        return new TokenResponse(jwt.create(u.getEmail()), u.getName());
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest r) {
        AppUser u = users.findByEmail(r.email())
            .filter(x -> encoder.matches(r.password(), x.getPasswordHash()))
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
        return new TokenResponse(jwt.create(u.getEmail()), u.getName());
    }
}