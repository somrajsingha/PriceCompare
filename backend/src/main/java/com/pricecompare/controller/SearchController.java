package com.pricecompare.controller;

import com.pricecompare.dto.ProductResult;
import com.pricecompare.service.SearchFacade;
import jakarta.validation.constraints.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
public class SearchController {
    private final SearchFacade facade;
    public SearchController(SearchFacade facade) { this.facade = facade; }

    @GetMapping("/search")
    public List<ProductResult> search(
            @RequestParam("q") @NotBlank @Size(min = 2, max = 100) String q) {
        return facade.search(q);
    }
}