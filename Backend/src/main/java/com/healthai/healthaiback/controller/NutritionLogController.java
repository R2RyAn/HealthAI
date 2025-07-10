package com.healthai.healthaiback.controller;

import com.healthai.healthaiback.model.NutritionLog;
import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.PersonRepository;
import com.healthai.healthaiback.service.NutritionLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/nutrition")
@CrossOrigin(origins = "*")
public class NutritionLogController {

    @Autowired
    private NutritionLogService nutritionLogService;

    @Autowired
    private PersonRepository personRepository;

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/log")
    public NutritionLog addLog(@AuthenticationPrincipal Person person, @RequestBody NutritionLog log) {
        log.setPerson(person);
        return nutritionLogService.save(log);
    }


    @GetMapping("/log/{personId}")
    public List<NutritionLog> getLogs(@PathVariable("personId") UUID personId) {
        Optional<Person> personOpt = personRepository.findById(personId);
        return personOpt.map(nutritionLogService::getLogsByPerson)
                .orElseThrow(() -> new RuntimeException("Person not found"));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<List<NutritionLog>> getCurrentUserNutritionLog(@AuthenticationPrincipal Person person) {
        return ResponseEntity.ok(getLogs(person.getId()));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me/today")
    public ResponseEntity<List<NutritionLog>> getTodaysNutritionLog(@AuthenticationPrincipal Person person) {
        LocalDate today = LocalDate.now();
        List<NutritionLog> todaysLogs = nutritionLogService.getLogsByPersonAndDateToday(person, today);
        return ResponseEntity.ok(todaysLogs);
    }


    @PreAuthorize("#personId == authentication.principal.id.toString() or hasRole('ADMIN')")
    @GetMapping("/log/{personId}/date")
    public List<NutritionLog> getLogsByDate(@PathVariable("personId") UUID personId,
                                            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Optional<Person> personOpt = personRepository.findById(personId);
        return personOpt.map(person -> nutritionLogService.getLogsByPersonAndDateToday(person, date))
                .orElseThrow(() -> new RuntimeException("Person not found"));
    }
}
