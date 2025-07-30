package com.healthai.healthaiback.service;

import com.healthai.healthaiback.model.NutritionLog;
import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.NutritionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class NutritionLogService {

    @Autowired
    private NutritionLogRepository nutritionLogRepository;

    public NutritionLog save(NutritionLog log) {
        return nutritionLogRepository.save(log);
    }

    public List<NutritionLog> getLogsByPerson(Person person) {
        return nutritionLogRepository.findByPerson(person);
    }

    public List<NutritionLog> getLogsByPersonAndDate(Person person, LocalDate date) {
        return nutritionLogRepository.findByPersonAndEntryDateOnly(person, date);
    }
    public void deleteLogById(UUID id, Person person) {
        NutritionLog log = nutritionLogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Log not found"));

        if (!log.getPerson().getId().equals(person.getId())) {
            throw new RuntimeException("Unauthorized to delete this log");
        }

        nutritionLogRepository.delete(log);
    }

}
