package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.model.Course;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class CoursePricingServiceTest {

    @Autowired
    CoursePricingService coursePricingService;

    @Autowired
    CourseService courseService;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getCurrentCoursePricing() {
        List<Course> courses = courseService.getCourses();
        for (Course course : courses) {
            assert (coursePricingService.getCurrentCoursePricing(course.getId()) == null);
        }
    }
}