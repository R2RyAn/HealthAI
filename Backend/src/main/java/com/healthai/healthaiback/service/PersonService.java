package com.healthai.healthaiback.service;

import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PersonService {

    private final PersonRepository personRepository;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }


    public ResponseEntity getAllPerson() {
        List<Person> persons = personRepository.findAll();
        if (persons.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(persons);
        }
    }

    public ResponseEntity<Person> getPersonById(String id) {
        try {
            UUID uuid = UUID.fromString(id);
            Person person = personRepository.findById(uuid).orElse(null);
            return person != null ? ResponseEntity.ok(person) : ResponseEntity.notFound().build();
        } catch (IllegalAccessError e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<Person> createPerson(Person person) {
        try {
            if (person.getId() != null) {
                return ResponseEntity.badRequest().body(null);
            }
            Person savedPerson = personRepository.save(person);
            return ResponseEntity.status(201).body(savedPerson);
        } catch (IllegalAccessError e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<Person> deletePerson(String id) {
        try {
            UUID uuid = UUID.fromString(id);
            if (personRepository.existsById(uuid)) {
                personRepository.deleteById(uuid);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<Person> updatePerson(String id, Person person) {
        try {
            UUID uuid = UUID.fromString(id);
            if (personRepository.existsById(uuid)) {
                person.setId(uuid);
                Person updatedPerson = personRepository.save(person);
                return ResponseEntity.ok(updatedPerson);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
