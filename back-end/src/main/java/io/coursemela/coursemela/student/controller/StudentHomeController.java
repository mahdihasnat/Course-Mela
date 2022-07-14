package io.coursemela.coursemela.student.controller;

import io.coursemela.coursemela.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class StudentHomeController {

//    @Autowired
//    private StudentRepository  studentRepository;

    @GetMapping("/")
    public String home(){
        return "hello from student home";
    }
}
