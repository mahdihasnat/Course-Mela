package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.CourseTagEntity;
import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.course.repository.CourseTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseTagRepository courseTagRepository;

	@Override
    public Course createCourse(Course course){
        CourseEntity courseEntity = new CourseEntity(course);
        System.out.println("courseEntity:"+courseEntity);
        courseEntity = courseRepository.save(courseEntity);
        for (CourseTagEntity courseTagEntity: courseEntity.getCourseTagEntities())
            courseTagRepository.save(courseTagEntity);
        course = new Course(courseEntity);
        return course;
    }

    @Override
    public List<Course> getCourses(){
        List<CourseEntity> courseEntities = courseRepository.findAll();
        List<Course> courses = courseEntities
                .stream()
                .map(course -> new Course(course))
                .collect(Collectors.toList());
        return courses;
    }

    @Override
    public List<Course> getCourseByInstructorUserName(String userName){
        List<CourseEntity> courseEntities = courseRepository.findCourseEntitiesByInstructorEntityUserName(userName);
        List<Course> courses = courseEntities
                .stream()
                .map(course -> new Course(course))
                .collect(Collectors.toList());
        return courses;
    }
}
