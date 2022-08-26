package io.coursemela.coursemela.plan.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PlanEntity {
    @Id
    @GeneratedValue
    Long id;

    String title;
    ZonedDateTime startTime;
    ZonedDateTime endTime;

    @ManyToOne
    StudentEntity studentEntity;

    @OneToMany(mappedBy = "planEntity")
    Set<PlanCourseEntity> planCourseEntities;
}
