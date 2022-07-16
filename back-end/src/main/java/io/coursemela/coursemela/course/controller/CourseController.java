package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.service.CourseService;

import io.coursemela.coursemela.instructor.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/course")
@RestController
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private InstructorService instructorService;

    @PostMapping("/")
    Course createCourse(@RequestBody Course course)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken)
            return null;
        String currentUserName = authentication.getName();
        course.setInstructor(instructorService.getInstructor(currentUserName));
        course = courseService.createCourse(course);
        return course;
    }

    @GetMapping("/")
    List<Course> getCourses(){
        return courseService.getCourses();
    }


}
