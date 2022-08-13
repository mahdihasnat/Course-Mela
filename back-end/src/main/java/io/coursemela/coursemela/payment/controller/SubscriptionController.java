package io.coursemela.coursemela.payment.controller;

import io.coursemela.coursemela.payment.model.SubscriptionDTO;
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
    public ResponseEntity<Boolean> subscribe(@RequestBody SubscriptionDTO subscriptionDTO) {
        log.info(subscriptionDTO.toString());
        return ResponseEntity.ok(false);
    }
}
