package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.course.model.Course;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


//https://www.baeldung.com/jpa-many-to-many




@Entity
@Data
@ToString(exclude = "courseEntity")
@EqualsAndHashCode(exclude="courseEntity")
@NoArgsConstructor
public class CourseTagEntity {

    @EmbeddedId
    CourseTagKey id;

    @ManyToOne
    @MapsId("courseId")
    @JoinColumn(name = "courseId")

    CourseEntity courseEntity;

    @ManyToOne
    @MapsId("tagId")
    @JoinColumn(name = "tagId")
    TagEntity tagEntity;

    public CourseTagEntity(CourseEntity courseEntity, TagEntity tagEntity) {
        this.courseEntity = courseEntity;
        this.tagEntity = tagEntity;
        this.id = new CourseTagKey(courseEntity.getId(),tagEntity.getId());
    }
}
