package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.model.Course;
import org.springframework.stereotype.Service;

import java.util.List;



public interface CourseService {
    Course createCourse(Course course);

    List<Course> getCourses();

    List<Course> getCourseByInstructorUserName(String userName);

   
}
