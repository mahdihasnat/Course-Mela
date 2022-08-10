package io.coursemela.coursemela.payment.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@EqualsAndHashCode
@ToString
public class StudentPromoKey implements Serializable {
    @Column(name = "studentId")
    Long studentId;

    @Column(name = "promoId")
    Long promoId;
}
