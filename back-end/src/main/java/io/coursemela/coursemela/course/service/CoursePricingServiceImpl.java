package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.CoursePricingEntity;
import io.coursemela.coursemela.course.model.CoursePricing;
import io.coursemela.coursemela.course.repository.CoursePricingRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CoursePricingServiceImpl implements CoursePricingService {
    @Autowired
    CoursePricingRepository coursePricingRepository;

    @Override
    public CoursePricing getCurrentCoursePricing(Long courseId) {
        log.debug("CourseId:",courseId);
        List<CoursePricingEntity> coursePricingEntities =
                coursePricingRepository.findFirstByCourseEntityIdOrderByStartDateDesc(courseId);
        if (coursePricingEntities.isEmpty())
            return null;
        return new CoursePricing(coursePricingEntities.get(0));
    }

    @Override
    public CoursePricing addCoursePricing(CourseEntity courseEntity, CoursePricing coursePricing) {
        CoursePricingEntity coursePricingEntity = CoursePricingEntity.builder()
                .courseEntity(courseEntity)
                .subsFee(coursePricing.getSubsFee())
                .insFee(coursePricing.getSubsFee())
                .offPercent(0.0)
                .build();
        coursePricingEntity = coursePricingRepository.save(coursePricingEntity);
        coursePricing = new CoursePricing(coursePricingEntity);
        return coursePricing;

    }

}
