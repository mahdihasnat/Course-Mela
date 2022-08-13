package io.coursemela.coursemela.payment.controller;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.payment.payload.CourseList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("subscribe")
@RestController()
@Slf4j
public class SubscriptionController {

    @PostMapping("/")
    public ResponseEntity<Boolean> subscribe(@RequestBody Course[] courses) {
        log.info("courses:", courses.toString());
        return ResponseEntity.ok(false);
    }
}
