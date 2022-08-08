package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.CoursePricingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CoursePricingRepository extends JpaRepository<CoursePricingEntity,Long> {
//    List<CoursePricingEntity> findByCourseEntityId(Long courseEntityId);
    List<CoursePricingEntity> findFirstByCourseEntityIdOrderByStartDateDesc(Long courseEntityId);
}
