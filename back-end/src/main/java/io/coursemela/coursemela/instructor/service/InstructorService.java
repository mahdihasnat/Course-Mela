package io.coursemela.coursemela.instructor.service;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    public Instructor getInstructor(String userName){
        Optional<InstructorEntity> instructor =instructorRepository.findByUserName(userName);
        if (! instructor.isPresent() )
            return null;
        return new Instructor(instructor.get());
    }
}
