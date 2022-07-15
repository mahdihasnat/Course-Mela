package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@ToString
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private InstructorEntity instructorEntity;

    @ManyToOne
    private TopicEntity topic;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String cover_photo_path;

    @Column(nullable = true)
    private String description;


    public CourseEntity(Long id, InstructorEntity instructorEntity, TopicEntity topic, String name) {
        this.id = id;
        this.instructorEntity = instructorEntity;
        this.topic = topic;
        this.name = name;
    }

    public CourseEntity() {
    }
}
