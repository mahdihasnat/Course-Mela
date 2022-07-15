package io.coursemela.coursemela.shared.entity;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;




    @ManyToOne
    private InstructorEntity instructorEntity;


    @ManyToOne
    private Topic topic;

    @Column(nullable = false)
    private String name;


    public Course(Long id, InstructorEntity instructorEntity, Topic topic, String name) {
        this.id = id;
        this.instructorEntity = instructorEntity;
        this.topic = topic;
        this.name = name;
    }

    public Course() {
    }
}
