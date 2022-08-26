package io.coursemela.coursemela.plan.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PlanCourseKey implements Serializable {
    @Column(name = "plan_id")
    Long planId;

    @Column(name = "course_id")
    Long courseId;
}
