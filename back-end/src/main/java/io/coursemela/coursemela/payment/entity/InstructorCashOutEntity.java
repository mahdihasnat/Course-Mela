package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@Data
public class InstructorCashOutEntity extends TransactionEntity {

    @ManyToOne
    private InstructorEntity instructor;
    
}