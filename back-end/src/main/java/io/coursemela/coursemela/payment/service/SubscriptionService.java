package io.coursemela.coursemela.payment.service;

import io.coursemela.coursemela.payment.model.SubscriptionDTO;

public interface SubscriptionService {
    Boolean subscribe(SubscriptionDTO subscriptionDTO, Long studentId) throws Exception;
}
