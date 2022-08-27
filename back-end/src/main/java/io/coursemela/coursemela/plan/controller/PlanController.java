package io.coursemela.coursemela.plan.controller;

import io.coursemela.coursemela.plan.model.Plan;
import io.coursemela.coursemela.plan.service.PlanService;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.repository.StudentRepository;
import io.coursemela.coursemela.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plan")
@Slf4j
public class PlanController {
//        TODO: Implement this controller with proper logic

    @Autowired
    PlanService planService;

    @Autowired
    StudentRepository studentRepository;

    @PostMapping("add")
    ResponseEntity createPlan(@RequestBody Plan plan) {
        try {
            log.info(plan.toString());
            Long userId = userService.getUserId();
            StudentEntity studentEntity = studentRepository.findById(userId).get();
            return ResponseEntity.ok(planService.createPlan(plan, studentEntity));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @Autowired
    UserService userService;

    @GetMapping("/")
    ResponseEntity getMyPlans() {
        try {
            Long userid = userService.getUserId();
            return ResponseEntity.ok(planService.getMyPlans(userid));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }
}
