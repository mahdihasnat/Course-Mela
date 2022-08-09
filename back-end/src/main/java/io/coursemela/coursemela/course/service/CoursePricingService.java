package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.model.CoursePricing;


public interface CoursePricingService {
    CoursePricing getCurrentCoursePricing(Long courseId);
    CoursePricing addCoursePricing(CourseEntity courseEntity, CoursePricing coursePricing);
}
