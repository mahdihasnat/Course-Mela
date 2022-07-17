package io.coursemela.coursemela.instructor.service;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorHomeService {

    @Autowired
    private   InstructorRepository instructorRepository;

    public List<InstructorEntity> getAllInstructor() {
        return instructorRepository.findAll();
    }


    public Optional<InstructorEntity> getInstructor(String userName)
    {
        return instructorRepository.findByUserName(userName);
    }
}
