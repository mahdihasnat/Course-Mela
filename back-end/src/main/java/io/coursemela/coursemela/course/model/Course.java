package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    private Long id;
    private InstructorEntity instructorEntity;
    private TopicEntity topic;
    private String name;
}