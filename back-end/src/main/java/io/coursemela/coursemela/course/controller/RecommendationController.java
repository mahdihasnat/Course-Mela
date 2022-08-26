package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course/popular")
public class RecommendationController {
    /// TODO : Implement this controller with proper logic
    @Autowired
    CourseService courseService;

    @GetMapping("watchTime")
    ResponseEntity getByWatchTime() {
        return ResponseEntity.ok(courseService.getCourses());
    }

    @GetMapping("sale")
    ResponseEntity getBySale() {
        return ResponseEntity.ok(courseService.getCourses());
    }

    @GetMapping("recent")
    ResponseEntity getByRecent() {
        return ResponseEntity.ok(courseService.getCourses());
    }
}
