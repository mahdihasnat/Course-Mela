package io.coursemela.coursemela.instructor.service;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.service.CourseService;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InstructorHomeService {

    @Autowired
    private InstructorRepository instructorRepository;
    @Autowired
    private CourseService courseService;

    @Autowired
    InstructorService instructorService;

    
    public List<Instructor> getAllInstructor() {
        return instructorRepository.findAll().stream()
                .map(instructorEntity ->
                        instructorService.getInstructorFromInstructorEntity(
                                instructorEntity)
                ).collect(Collectors.toList());
    }


    public Optional<InstructorEntity> getInstructor(String userName) {
        return instructorRepository.findByUserName(userName);
    }


    public Course getCourse(Long id, String userName) {
        // no checking of userName if he is the owner of the course
        Course course = courseService.getCourse(id);

        if (course.getInstructor().getUserName().equals(userName))
            return course;
        else
            return null;

        // List<Course> courses = courseService.getCourseByInstructorUserName(UserContext.getUserName());

    }
}
