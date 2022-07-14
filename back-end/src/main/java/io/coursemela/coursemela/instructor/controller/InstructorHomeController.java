package io.coursemela.coursemela.instructor.controller;

import io.coursemela.coursemela.instructor.entity.Instructor;
import io.coursemela.coursemela.instructor.service.InstructorHomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/instructor")
@RestController
public class InstructorHomeController {
    @Autowired
    private  InstructorHomeService instructorHomeService;

    @GetMapping("/")
    public List<Instructor> getAllInstructor(){
        return instructorHomeService.getAllInstructor();
    }

}
