package io.coursemela.coursemela.course.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;


//https://www.baeldung.com/jpa-many-to-many


@Entity
@Data
@ToString(exclude = "courseEntity")
@EqualsAndHashCode(exclude = "courseEntity")
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
        this.id = new CourseTagKey(courseEntity.getId(), tagEntity.getId());
    }
}
