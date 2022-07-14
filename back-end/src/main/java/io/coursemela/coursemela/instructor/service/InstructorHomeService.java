package io.coursemela.coursemela.instructor.service;

import io.coursemela.coursemela.instructor.entity.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorHomeService {

    @Autowired
    private   InstructorRepository instructorRepository;


    public List<Instructor> getAllInstructor() {
        return instructorRepository.findAll();
    }
}
