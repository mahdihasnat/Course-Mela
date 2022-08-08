package io.coursemela.coursemela.course.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;


@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CourseTagKey implements Serializable {

    @Column(name = "courseId")
    Long courseId;

    @Column(name="tagId")
    Long tagId;

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