package com.healthai.healthaiback.controller;

import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.PersonRepository;
import com.healthai.healthaiback.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.sql.PreparedStatement;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/person")
public class PersonController {

    @Autowired
    PersonService personService;

    // GET all persons
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<Person> getAllPersons() {
        return personService.getAllPerson();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<Person> getCurrentUser(@AuthenticationPrincipal Person person) {
        return ResponseEntity.ok(person);
    }

    @PreAuthorize("#id == authentication.principal.id.toString() or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable String id) {
        return personService.getPersonById(id);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Person> createPerson(@RequestBody Person person){
        return personService.createPerson(person);
    }
    @PreAuthorize("#id == authentication.principal.id.toString() or hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Person> deletePerson(@PathVariable String id) {
        return personService.deletePerson(id);
    }
    @PreAuthorize("#id == authentication.principal.id.toString() or hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable String id, @RequestBody Person person) {
        return personService.updatePerson(id, person);
    }


//    // POST create a new person
//    @PostMapping
//    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
//        Person savedPerson = personRepository.save(person);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedPerson);
//    }
//
//
//    // PUT update a person by ID
//    @PutMapping("/{id}")
//    public ResponseEntity<Person> updatePerson(@PathVariable Long id, @RequestBody Person updatedPerson) {
//        return personRepository.findById(id).map(person -> {
//            person.setFirstName(updatedPerson.getFirstName());
//            person.setLastName(updatedPerson.getLastName());
//            person.setEmail(updatedPerson.getEmail());
//            person.setPassword(updatedPerson.getPassword());
//            person.setAge(updatedPerson.getAge());
//            person.setGender(updatedPerson.getGender());
//            person.setHeightCm(updatedPerson.getHeightCm());
//            person.setWeightKg(updatedPerson.getWeightKg());
//            person.setGoalType(updatedPerson.getGoalType());
//            person.setRole(updatedPerson.getRole());
//            return ResponseEntity.ok(personRepository.save(person));
//        }).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // DELETE a person by ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deletePerson(@PathVariable Long id) {
//        if (personRepository.existsById(id)) {
//            personRepository.deleteById(id);
//            return ResponseEntity.noContent().build();
//        }
//        return ResponseEntity.notFound().build();
//    }
}
