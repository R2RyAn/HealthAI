package com.healthai.healthaiback;

import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repository.PersonRepository;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HealthAiBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(HealthAiBackApplication.class, args);
    }

}
