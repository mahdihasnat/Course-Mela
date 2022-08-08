package io.coursemela.coursemela.course.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class CoursePricingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    private CourseEntity courseEntity;
    private Date startDate;
    private Long subsFee; // actual subscription fee paid by user
    private Long insFee; // actual fee get by instructor
    private Double offPercent;

}
