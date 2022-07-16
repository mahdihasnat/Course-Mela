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
    CourseEntity courseEntity;

    @Column(nullable = true)
    Date startDate;

    Long subsFee;

    Long insFee;

    Double offPercent;

}
