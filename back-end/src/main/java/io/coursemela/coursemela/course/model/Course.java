package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.CourseTagEntity;
import io.coursemela.coursemela.course.service.CoursePricingService;
import io.coursemela.coursemela.instructor.model.Instructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
@Component
public class Course {
    private Long id;
    private Instructor instructor;
    private Topic topic;
    private String name;
    private String cover_photo_path;
    private String description;
    private List<Tag> tags;

    CoursePricing coursePricing;

    @Autowired
    private CoursePricingService coursePricingService;

    public Course initFromEntity(CourseEntity courseEntity) {
        this.id = courseEntity.getId();
        this.instructor = new Instructor((courseEntity.getInstructorEntity()));
        this.topic = new Topic(courseEntity.getTopicEntity());
        this.name = courseEntity.getName();
        this.cover_photo_path = courseEntity.getCover_photo_path();
        this.description = courseEntity.getDescription();
        this.tags = new ArrayList<>();
        for (CourseTagEntity courseTag : courseEntity.getCourseTagEntities())
            tags.add(new Tag(courseTag.getTagEntity()));
        log.debug("coursePricing Service:" + coursePricingService.toString());
        this.coursePricing = coursePricingService.getCurrentCoursePricing(this.id);
        return this;
    }
}