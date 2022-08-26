package io.coursemela.coursemela.plan.controller;

import io.coursemela.coursemela.plan.model.Plan;
import io.coursemela.coursemela.plan.service.PlanService;
import io.coursemela.coursemela.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/plan")
public class PlanController {
//        TODO: Implement this controller with proper logic

    @Autowired
    PlanService planService;

    @PostMapping("add")
    Plan createPlan(@RequestBody Plan plan) {
        return plan;
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
