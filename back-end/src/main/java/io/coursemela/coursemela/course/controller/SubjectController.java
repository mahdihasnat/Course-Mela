package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Subject;
import io.coursemela.coursemela.course.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/subject")
@Controller
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @GetMapping("/")
    List<Subject> getAllSubject() {
        return subjectService.getAllSubject();
    }
}
