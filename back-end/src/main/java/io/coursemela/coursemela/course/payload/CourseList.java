package io.coursemela.coursemela.payment.payload;

import io.coursemela.coursemela.course.model.Course;
import lombok.Data;

import java.util.List;

@Data
public class CourseList {
    List<Course> course;
}
