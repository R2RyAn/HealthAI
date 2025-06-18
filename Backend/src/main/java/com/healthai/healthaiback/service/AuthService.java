package com.healthai.healthaiback.service;

import com.healthai.healthaiback.model.Person;
import com.healthai.healthaiback.repo.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private PersonService personService;

    @Autowired
    private PersonRepository personRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public boolean emailExists(String email){
        return personRepository.findByEmail(email).isPresent();
    }

    public ResponseEntity<Person> signup(Person person){
        person.setPassword(passwordEncoder.encode(person.getPassword()));
        return personService.createPerson(person);
    }

    public boolean authenticate(String email, String rawPassword) {
        Optional<Person> optionalPerson = personRepository.findByEmail(email);
        if (optionalPerson.isEmpty()) {
            return false;
        }

        Person person = optionalPerson.get();
        return passwordEncoder.matches(rawPassword, person.getPassword());
    }

}
