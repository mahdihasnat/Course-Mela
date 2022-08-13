package io.coursemela.coursemela.payment.controller;

import io.coursemela.coursemela.payment.model.SubscriptionDTO;
import io.coursemela.coursemela.payment.service.SubscriptionService;
import io.coursemela.coursemela.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("subscribe")
@RestController()
@Slf4j
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    UserService userService;

    @PostMapping("/")
    public ResponseEntity subscribe(@RequestBody SubscriptionDTO subscriptionDTO) {
        log.info(subscriptionDTO.toString());
        try {
            subscriptionService.subscribe(subscriptionDTO, userService.getUserId());
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
