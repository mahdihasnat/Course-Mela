package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.model.CoursePricing;
import org.springframework.stereotype.Service;

@Service
public interface CoursePricingService {
    CoursePricing getCurrentCoursePrice(Long courseId);
}
