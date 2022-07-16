package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.model.Instructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    private Long id;
    private Instructor instructor;
    private Topic topic;
    private String name;
    private String cover_photo_path;
    private String description;
    private List<Tag> tags;
    public Course(CourseEntity courseEntity){
        this.id = courseEntity.getId();
        this.instructor = new Instructor((courseEntity.getInstructorEntity()));
        this.topic = new Topic(courseEntity.getTopicEntity());
        this.cover_photo_path = courseEntity.getCover_photo_path();
        this.description = courseEntity.getDescription();
    }
}