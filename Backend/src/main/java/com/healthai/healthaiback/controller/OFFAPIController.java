package com.healthai.healthaiback.controller;

import com.healthai.healthaiback.model.OFFAPI;
import com.healthai.healthaiback.service.OFFAPIService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class OFFAPIController {

    private final OFFAPIService offapiService;

    public OFFAPIController(OFFAPIService offapiService) {
        this.offapiService = offapiService;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{barcode}")
    public OFFAPI.Product getProduct(@PathVariable String barcode) {
        return offapiService.getProductByBarcode(barcode);
    }
}

