package io.coursemela.coursemela.plan.service;

import io.coursemela.coursemela.plan.entity.PlanEntity;
import io.coursemela.coursemela.plan.model.Plan;
import io.coursemela.coursemela.student.entity.StudentEntity;

import java.time.ZonedDateTime;
import java.util.List;

public interface PlanService {
    Plan createPlan(Plan plan, StudentEntity studentEntity);

    List<Plan> getMyPlans(Long studentId);


    List<Double> getProgress(Long planId);

    Double getProgressBetween(PlanEntity planEntity, ZonedDateTime startTime, ZonedDateTime endTime);
}
