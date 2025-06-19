package com.healthai.healthaiback.controller;
import com.healthai.healthaiback.config.TokenResponse;
import com.healthai.healthaiback.model.LoginRequest;
import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.service.AuthService;
import com.healthai.healthaiback.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Person person){
        if(authService.emailExists(person.getEmail())){
            return ResponseEntity.badRequest().body("Email already exists");
        }

        authService.signup(person);
        return ResponseEntity.ok("Signup successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean success = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (success) {
            String jwt = jwtService.generateToken(loginRequest.getEmail());
            TokenResponse tokenResponse = new TokenResponse(jwt);  // Wrap the token in a response object
            return ResponseEntity.ok(tokenResponse);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }
    }
}
