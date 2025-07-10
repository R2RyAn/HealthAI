package com.healthai.healthaiback.repo;

import com.healthai.healthaiback.model.NutritionLog;
import com.healthai.healthaiback.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface NutritionLogRepository extends JpaRepository<NutritionLog, Long> {
    List<NutritionLog> findByPerson(Person person);
    List<NutritionLog> findByPersonAndEntryDateBetween(Person person, LocalDateTime startOfDay, LocalDateTime endOfDay);
    List<NutritionLog> findByPersonAndEntryDate(Person person, LocalDate entryDate);


}
