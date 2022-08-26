package io.coursemela.coursemela.plan.repository;

import io.coursemela.coursemela.plan.entity.PlanCourseEntity;
import io.coursemela.coursemela.plan.entity.PlanCourseKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanCourseRepository extends JpaRepository<PlanCourseEntity, PlanCourseKey> {

}