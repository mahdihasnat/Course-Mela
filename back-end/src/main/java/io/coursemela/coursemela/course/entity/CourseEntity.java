package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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
    private TopicEntity topicEntity;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String coverPhotoPath;

    @Column(nullable = true)
    private String description;

    @OneToMany(mappedBy = "courseEntity")
    Set<CourseTagEntity> courseTagEntities;


    public CourseEntity(Course course) {
        this.id = course.getId();
        this.name = course.getName();
        this.instructorEntity = new InstructorEntity(course.getInstructor());
        this.topicEntity = new TopicEntity(course.getTopic());
        this.name = course.getName();
        this.description = course.getDescription();
        this.courseTagEntities = new HashSet<>();
        for (Tag tag : course.getTags())
            this.courseTagEntities.add(new CourseTagEntity(this, new TagEntity(tag)));

    }

    public CourseEntity() {
    }

    public CourseEntity(Long id, InstructorEntity instructorEntity, TopicEntity topicEntity, String name, String coverPhotoPath, String description) {
        this.id = id;
        this.instructorEntity = instructorEntity;
        this.topicEntity = topicEntity;
        this.name = name;
        this.coverPhotoPath = coverPhotoPath;
        this.description = description;
    }
}
