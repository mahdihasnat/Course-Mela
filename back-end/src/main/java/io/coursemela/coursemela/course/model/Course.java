package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
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
    private InstructorEntity instructorEntity;
    private TopicEntity topic;
    private String name;
    private String cover_photo_path;
    private String description;
    private List<Tag> tags;
}