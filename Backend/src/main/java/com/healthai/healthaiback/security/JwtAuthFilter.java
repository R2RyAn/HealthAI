package com.healthai.healthaiback.security;

import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.PersonRepository;
import com.healthai.healthaiback.service.JwtService;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PersonRepository personRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // ✅ Add this at the very top:
        System.out.println("FILTER — Before check: " + request.getRequestURI());
        System.out.println("FILTER — Context auth BEFORE: " + SecurityContextHolder.getContext().getAuthentication());

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        String email;

        try {
            email = jwtService.extractEmail(token);
        } catch (JwtException | IllegalArgumentException e) {
            filterChain.doFilter(request, response);
            return;
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<Person> user = personRepository.findByEmail(email);

            if (user.isPresent()) {
                List<SimpleGrantedAuthority> authorities = List.of(
                        new SimpleGrantedAuthority("ROLE_" + user.get().getRole().name())
                );

                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user.get(), null, authorities
                );

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // ✅ Log after setting it:
                System.out.println("FILTER — Context auth AFTER: " + SecurityContextHolder.getContext().getAuthentication());
            }
        }

        // ✅ Optional: still log the raw header
        System.out.println("Authorization header: " + request.getHeader("Authorization"));
        System.out.println("Is token valid? ...");

        filterChain.doFilter(request, response);
    }

}
