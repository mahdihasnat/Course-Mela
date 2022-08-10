package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
public class StudentPromoEntity {
    @EmbeddedId
    private StudentPromoKey id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "studentId")
    private StudentEntity studentEntity;

    @ManyToOne
    @MapsId("promoId")
    @JoinColumn(name = "promoId")
    private PromoEntity promoEntity;

    private int remainingTime;

    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
}
