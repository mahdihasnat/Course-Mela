package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.service.CourseService;

import io.coursemela.coursemela.instructor.service.InstructorService;
import io.coursemela.coursemela.user.context.UserContext;
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
        try {
            String currentUserName = UserContext.getUserName();
            course.setInstructor(instructorService.getInstructor(currentUserName));
            course = courseService.createCourse(course);
            return course;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }

    }

    @GetMapping("/")
    List<Course> getCourses(){
        return courseService.getCourses();
    }


}