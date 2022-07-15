package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

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


    public CourseEntity(Long id, InstructorEntity instructorEntity, TopicEntity topic, String name) {
        this.id = id;
        this.instructorEntity = instructorEntity;
        this.topic = topic;
        this.name = name;
    }

    public CourseEntity() {
    }
}
