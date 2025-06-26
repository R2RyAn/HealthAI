package com.healthai.healthaiback.controller;

import com.healthai.healthaiback.model.NutritionLog;
import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.PersonRepository;
import com.healthai.healthaiback.service.NutritionLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("#personId == authentication.principal.id.toString() or hasRole('ADMIN')")
    @PostMapping("/log/{personId}")
    public NutritionLog addLog(@PathVariable("personId") UUID personId,
                               @RequestBody NutritionLog log) {
        Optional<Person> personOpt = personRepository.findById(personId);
        if (personOpt.isPresent()) {
            log.setPerson(personOpt.get());
            return nutritionLogService.save(log);
        } else {
            throw new RuntimeException("Person not found");
        }
    }

    @GetMapping("/log/{personId}")
    public List<NutritionLog> getLogs(@PathVariable("personId") UUID personId) {
        Optional<Person> personOpt = personRepository.findById(personId);
        return personOpt.map(nutritionLogService::getLogsByPerson)
                .orElseThrow(() -> new RuntimeException("Person not found"));
    }

    @PreAuthorize("#personId == authentication.principal.id.toString() or hasRole('ADMIN')")
    @GetMapping("/log/{personId}/date")
    public List<NutritionLog> getLogsByDate(@PathVariable("personId") UUID personId,
                                            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        Optional<Person> personOpt = personRepository.findById(personId);
        return personOpt.map(person -> nutritionLogService.getLogsByPersonAndDate(person, date))
                .orElseThrow(() -> new RuntimeException("Person not found"));
    }
}
