package io.coursemela.coursemela.payment.controller;

import io.coursemela.coursemela.course.model.Course;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("subscribe")
@Slf4j
public class SubscriptionController {

    @PostMapping("/")
    public ResponseEntity<Boolean> subscribe(@RequestParam("courses") List<Course> courses) {
        log.info("courses:", courses.toString());
        return ResponseEntity.ok(false);
    }
}
