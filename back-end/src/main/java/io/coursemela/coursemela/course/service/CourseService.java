package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

	public Course createCourse(Course course){
        CourseEntity courseEntity = new CourseEntity(course);
        courseEntity = courseRepository.save(courseEntity);
        course = new Course(courseEntity);
        return course;
    }

    public List<Course> getCourses(){
        List<CourseEntity> courseEntities = courseRepository.findAll();
        List<Course> courses = courseEntities
                .stream()
                .map(course -> new Course(course))
                .collect(Collectors.toList());
        return courses;
    }
}
