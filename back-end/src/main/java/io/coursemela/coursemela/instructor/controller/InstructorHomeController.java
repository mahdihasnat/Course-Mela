package io.coursemela.coursemela.instructor.controller;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.service.CourseService;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.service.InstructorHomeService;
import io.coursemela.coursemela.user.context.UserContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RequestMapping("/instructor")
@Slf4j
@RestController
public class InstructorHomeController {
    @Autowired
    private InstructorHomeService instructorHomeService;


    @GetMapping("/")
    public ResponseEntity getAllInstructor() {
        return ResponseEntity.ok(instructorHomeService.getAllInstructor());
    }

    @GetMapping("/details")
    public Optional<InstructorEntity> getInstructorDetails() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken)
            return null;
        String currentUserName = authentication.getName();
        return instructorHomeService.getInstructor(currentUserName);
    }

    @Autowired
    private CourseService courseService;

    @GetMapping("/courses")
    public List<Course> getMyCourses() throws Exception {
        return courseService.getCourseByInstructorUserName(UserContext.getUserName());
    }

    @GetMapping("/courses/{courseId}")
    Course getCourse(@PathVariable("courseId") Long id) throws Exception {
        log.info("got a request of id " + id);
        return instructorHomeService.getCourse(id, UserContext.getUserName());
        // return courseService.getCourse(id);
        // List<Course> courses =  courseService.getCourseByInstructorUserName(UserContext.getUserName());
    }

}
