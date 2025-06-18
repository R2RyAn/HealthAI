package com.healthai.healthaiback.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class HelloController {

    @GetMapping("/")
    public String hello(HttpServletRequest request) {
        return "Hello, World! " +request.getSession().getId();
    }
    @GetMapping("/csrf-token")
    public CsrfToken getCsrtToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute("_csrf");
    }

}
