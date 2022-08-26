package io.coursemela.coursemela.plan.entity;

import io.coursemela.coursemela.course.entity.CourseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class PlanCourseEntity {

    @EmbeddedId
    PlanCourseKey id;

    @ManyToOne
    @MapsId("planId")
    @JoinColumn(name = "plan_id")
    PlanEntity planEntity;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "course_id")
    CourseEntity courseEntity;

}
