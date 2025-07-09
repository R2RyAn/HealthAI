package com.healthai.healthaiback.controller;

import com.healthai.healthaiback.model.BodyFat;
import com.healthai.healthaiback.service.BodyFatService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bodyfat")
public class BodyFatController {

    @Autowired
    private BodyFatService bodyFatService;
    @PostMapping("/predict")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BodyFat> predictBodyFat(
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request  // 👈 add this!
    ) {
        System.out.println("Filter running for URL: " + request.getRequestURI());
        System.out.println("CONTROLLER — Auth: " + SecurityContextHolder.getContext().getAuthentication());
        BodyFat prediction = bodyFatService.getPrediction(file);
        return ResponseEntity.ok(prediction);
    }

}
