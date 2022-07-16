package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.course.model.Course;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;


//https://www.baeldung.com/jpa-many-to-many

@Embeddable
class CourseTagKey implements Serializable{

    @Column(name = "courseId")
    Long courseId;

    @Column(name="tagId")
    Long tagId;

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CourseTagKey that = (CourseTagKey) o;
        return courseId.equals(that.courseId) && tagId.equals(that.tagId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseId, tagId);
    }
}


@Entity
@Data
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
}
