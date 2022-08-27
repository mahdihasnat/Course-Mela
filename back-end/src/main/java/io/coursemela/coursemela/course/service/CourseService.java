package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.model.Course;
import org.springframework.web.multipart.MultipartFile;

import java.time.ZonedDateTime;
import java.util.List;


public interface CourseService {
    Course createCourse(Course course);

    List<Course> getCourses();

    List<Course> getCourseByInstructorUserName(String userName);

    boolean updateCourseCoverImageLocation(String courseId, MultipartFile file);

    Course getCourse(Long id);


    List<Course> getMyCourses(Long userId);

    Course getCourseFromCourseEntity(CourseEntity courseEntity);

    Long getTotalEarn(Long courseId, ZonedDateTime startTime);

    List<Course> getCoursesOfTopic(Long topicId);

    Double getTotalWatchTime(Long courseId, ZonedDateTime sratTime);

    Boolean isEnrolled(Long courseId, Long studentId);

    Double getTotalVideoDurationOfCourse(Long courseId);

    Integer getTotalVideoCountOfCourse(Long courseId);
}
