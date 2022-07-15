package io.coursemela.coursemela.instructor.controller;

import io.coursemela.coursemela.instructor.entity.Instructor;
import io.coursemela.coursemela.instructor.service.InstructorHomeService;
import io.coursemela.coursemela.shared.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequestMapping("/instructor")
@RestController
public class InstructorHomeController {
    @Autowired
    private  InstructorHomeService instructorHomeService;

    @GetMapping("/")
    public List<Instructor> getAllInstructor(){
        return instructorHomeService.getAllInstructor();
    }

    @GetMapping("/details")
    public Optional<Instructor> getInstructorDetails(){
        return Optional.of(new Instructor("jhon", "John", "Doe", "vodro@gmail.com", "123", "0122", new Date(), 0, "I am new to spring boot"));

    }

    @GetMapping("/courses")
    public List<Course> getMyCourses(){
        return Arrays.asList( new Course(new Long(1), null, null, "limit") );
    }

}
