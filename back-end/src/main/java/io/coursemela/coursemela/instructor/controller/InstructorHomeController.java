package io.coursemela.coursemela.instructor.controller;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.service.InstructorHomeService;
import io.coursemela.coursemela.shared.entity.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public List<InstructorEntity> getAllInstructor(){
        return instructorHomeService.getAllInstructor();
    }

    @GetMapping("/details")
    public Optional<InstructorEntity> getInstructorDetails(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken)
            return null;
        String currentUserName = authentication.getName();
        return  instructorHomeService.getInstructor(currentUserName);
    }

    @GetMapping("/courses")
    public List<Course> getMyCourses(){
        return Arrays.asList( new Course(new Long(1), null, null, "limit") );
    }

}
