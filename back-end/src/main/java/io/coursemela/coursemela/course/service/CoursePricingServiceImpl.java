package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CoursePricingEntity;
import io.coursemela.coursemela.course.model.CoursePricing;
import io.coursemela.coursemela.course.repository.CoursePricingRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class CoursePricingServiceImpl implements CoursePricingService {
    @Autowired
    CoursePricingRepository coursePricingRepository;
    @Override
    public CoursePricing getCurrentCoursePrice(Long courseId) {
        List<CoursePricingEntity> coursePricingEntities =
                coursePricingRepository.findFirstByCourseEntityIdOrderByStartDateDesc(courseId);
        if(coursePricingEntities.isEmpty())
            return null;
        return  new CoursePricing(coursePricingEntities.get(0));
    }
}
