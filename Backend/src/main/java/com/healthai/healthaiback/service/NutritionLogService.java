package com.healthai.healthaiback.service;

import com.healthai.healthaiback.model.NutritionLog;
import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.NutritionLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    public List<NutritionLog> getLogsByPersonAndDateToday(Person person, LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(23, 59, 59);
        return nutritionLogRepository.findByPersonAndEntryDateBetween(person, startOfDay, endOfDay);
    }
}
