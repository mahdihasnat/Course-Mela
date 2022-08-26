package io.coursemela.coursemela.payment.model;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.payment.enumeration.TransactionMedium;
import lombok.Data;

import java.util.List;

@Data
public class SubscriptionDTO {
    List<Course> courses;
    Promo promo;
    private String bankInfo;
    private String accountInfo;
    private Long amount;
    private TransactionMedium transactionMedium;
}
