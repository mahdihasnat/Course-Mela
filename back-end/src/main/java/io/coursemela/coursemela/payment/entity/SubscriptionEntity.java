package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.course.entity.CoursePricingEntity;
import io.coursemela.coursemela.student.entity.StudentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.ZonedDateTime;


@Embeddable
class SubscriptionKey {
    @Column(name = "studentId")
    Long studentId;

    @Column(name = "coursePricingId")
    Long coursePricingId;

}


// TODO: remove TransactionEntity
@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionEntity extends TransactionEntity {

    @ManyToOne
    private StudentEntity studentEntity;

    @ManyToOne
    private CoursePricingEntity coursePricingEntity;

    @ManyToOne
    private PaymentEntity paymentEntity;

    private ZonedDateTime startTime;
    private ZonedDateTime endTime;

}
