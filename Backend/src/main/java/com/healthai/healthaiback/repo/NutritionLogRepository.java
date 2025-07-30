package com.healthai.healthaiback.repo;

import com.healthai.healthaiback.model.NutritionLog;
import com.healthai.healthaiback.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface NutritionLogRepository extends JpaRepository<NutritionLog, UUID> {
    List<NutritionLog> findByPerson(Person person);

    List<NutritionLog> findByPersonAndEntryDateBetween(Person person, LocalDateTime startOfDay, LocalDateTime endOfDay);

    @Query("SELECT n FROM NutritionLog n " +
            "WHERE n.person = :person " +
            "AND FUNCTION('DATE', n.entryDate) = :date")
    List<NutritionLog> findByPersonAndEntryDateOnly(
            @Param("person") Person person,
            @Param("date") LocalDate date
    );
}
