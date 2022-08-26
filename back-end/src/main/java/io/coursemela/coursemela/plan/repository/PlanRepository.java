package io.coursemela.coursemela.plan.repository;

import io.coursemela.coursemela.plan.entity.PlanEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<PlanEntity, Long> {
    List<PlanEntity> findAllByStudentEntityId(Long studentId);
}