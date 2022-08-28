package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.service.CourseService;
import io.coursemela.coursemela.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course/my")
public class MyCourseController {
    /// TODO : Implement MyCourseController with appropriate methods and logics
    @Autowired
    private CourseService courseService;
    @Autowired
    UserService userService;

    @GetMapping("/")
    ResponseEntity getMyCourses() {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(courseService.getMyCourses(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    ResponseEntity getAllCourses() {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(courseService.getMyCourses(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        }
    }

    @GetMapping("/focus")
    ResponseEntity getFocusCourses() {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(courseService.getMyCoursesOrderByLeastProgress(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        }
    }

    @GetMapping("/subscribed-recently")
    ResponseEntity getSubscribedRecentlyCourses() {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(courseService.getMyCourses(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        }
    }
}
