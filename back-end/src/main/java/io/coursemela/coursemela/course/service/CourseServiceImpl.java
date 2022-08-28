package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.CourseTagEntity;
import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.course.model.Topic;
import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.course.repository.CourseTagRepository;
import io.coursemela.coursemela.instructor.service.InstructorService;
import io.coursemela.coursemela.shared.util.UrlCollections;
import io.coursemela.coursemela.storage.StorageService;
import io.coursemela.coursemela.video.repository.ViewLogRepository;
import io.coursemela.coursemela.video.service.ViewLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CourseServiceImpl implements CourseService {
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StorageService storageService;

    @Autowired
    private CourseTagRepository courseTagRepository;

    @Autowired
    private CoursePricingService coursePricingService;

    @Autowired
    ApplicationContext applicationContext;

    @Override
    public Course createCourse(Course course) {
        CourseEntity courseEntity = new CourseEntity(course);
        System.out.println("courseEntity:" + courseEntity);
        courseEntity = courseRepository.save(courseEntity);
        for (CourseTagEntity courseTagEntity : courseEntity.getCourseTagEntities())
            courseTagRepository.save(courseTagEntity);

        // add course price
        coursePricingService.addCoursePricing(courseEntity, course.getCoursePricing());

        course = getCourseFromCourseEntity(courseEntity);
        return course;
    }

    @Override
    public List<Course> getCourses() {
        List<CourseEntity> courseEntities = courseRepository.findAll();
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> getCourseFromCourseEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }

    @Override
    public Course getCourse(Long id) {
        CourseEntity courseEntity = courseRepository.findById(id).orElse(null);
        Course course = getCourseFromCourseEntity(courseEntity);
        return course;
    }

    @Override
    public List<Course> getMyCourses(Long userId) {
        List<CourseEntity> courseEntities = courseRepository.getAllSubscribedCourses(userId, ZonedDateTime.now());
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> getCourseFromCourseEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }

    @Override
    public List<Course> getCourseByInstructorUserName(String userName) {
        List<CourseEntity> courseEntities = courseRepository.findAllByInstructorEntityUserName(userName);
        log.info(courseEntities.toString());
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> getCourseFromCourseEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }

    @Override
    public boolean updateCourseCoverImageLocation(String courseId, MultipartFile file) {
        Path path = storageService.store(file, courseId);
        log.info("path file name: " + path.getFileName().toString());
        log.info(path.toString());
        System.out.println(path);

        String url = UrlCollections.getBaseUrl() + "/fileserver/image/?fileId=" + courseId;
        CourseEntity course = courseRepository.findById(Long.valueOf(courseId)).get();
        course.setCoverPhotoPath(url);
        courseRepository.save(course);
        return true;

        // return true

    }

    @Autowired
    InstructorService instructorService;

    @Override
    public Course getCourseFromCourseEntity(CourseEntity courseEntity) {
        Course course = Course.builder()
                .id(courseEntity.getId())
                .instructor(instructorService.getInstructorFromInstructorEntity(
                        courseEntity.getInstructorEntity()))
                .topic(new Topic(courseEntity.getTopicEntity()))
                .name(courseEntity.getName())
                .coverPhotoPath(courseEntity.getCoverPhotoPath())
                .description(courseEntity.getDescription())
                .tags(new ArrayList<>())
                .coursePricing(coursePricingService.getCurrentCoursePricing(courseEntity.getId()))
                .build();
        for (CourseTagEntity courseTag : courseEntity.getCourseTagEntities())
            course.getTags().add(new Tag(courseTag.getTagEntity()));
        return course;
    }

    @Override
    public Long getTotalEarn(Long courseId, ZonedDateTime startTime) {
        Long ret = courseRepository.totalEarnOfCourse(courseId, startTime);
        if (ret == null)
            ret = 0L;
        return ret;
    }

    @Override
    public Long getTotalEarnOfAllCoursesByInstructor(Long instructorId, ZonedDateTime startTime) {
        Long ret = 0L;
        List<CourseEntity> courseEntities = courseRepository.findAllByInstructorEntityId(instructorId);
        for (CourseEntity c : courseEntities) {
            ret += getTotalEarn(c.getId(), startTime);
        }
        return ret;
    }

    @Override
    public List<Course> getCoursesOfTopic(Long topicId) {
        return courseRepository.findAllByTopicEntityId(topicId).stream().map(
                courseEntity -> getCourseFromCourseEntity(courseEntity)).collect(Collectors.toList());
    }

    @Autowired
    ViewLogRepository viewLogRepository;

    @Override
    public Double getTotalWatchTime(Long courseId, ZonedDateTime startTime) {
        Double ret = viewLogRepository.getTotalWatchTimeOfCourse(courseId, startTime);
        if (ret == null)
            ret = 0.0;
        return ret;
    }

    @Override
    public Boolean isEnrolled(Long courseId, Long studentId) {
        Integer ret = courseRepository.isEnrolled(courseId, studentId, ZonedDateTime.now());
        if (ret == null || ret == 0)
            return false;
        else
            return true;
    }

    @Override
    public Double getTotalVideoDurationOfCourse(Long courseId) {
        Double ret = courseRepository.getTotalVideoDurationOfCourse(courseId);
        if (ret == null)
            ret = 0.0;
        return ret;
    }

    @Override
    public Integer getTotalVideoCountOfCourse(Long courseId) {
        Integer ret = courseRepository.getTotalVideoCountOfCourse(courseId);
        if (ret == null)
            ret = 0;
        return ret;
    }

    @Override
    public List<Course> getCoursesOrderByWatchTime() {
        List<CourseEntity> courseEntities = courseRepository.getCoursesOrderByWatchTime();
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> getCourseFromCourseEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }

    @Override
    public List<Course> getMyCoursesOrderByRecentSubscription(Long userId) {
        List<CourseEntity> courseEntities = courseRepository.getMyCoursesOrderByRecentSubscription(userId);
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> getCourseFromCourseEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }

    Long getTotalSalesOfCourse(Long courseId) {
        Long ret = courseRepository.getTotalSalesOfCourse(courseId);
        if (ret == null)
            ret = 0L;
        return ret;
    }

    @Override
    public List<Course> getCoursesOrderBySale() {
        List<CourseEntity> courseEntities = courseRepository.findAll();
        courseEntities.sort((c1, c2) -> -(getTotalSalesOfCourse(c1.getId())
                .compareTo(getTotalSalesOfCourse(c2.getId()))));
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> getCourseFromCourseEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }

    @Autowired
    ViewLogService viewLogService;

    @Override
    public List<Course> getMyCoursesOrderByLeastProgress(Long userId) {
        List<CourseEntity> courseEntities = courseRepository.getMyCoursesOrderByRecentSubscription(userId);
        courseEntities.sort((c1, c2) -> (viewLogService.getProgressOfCourse(userId, c1.getId())
                .compareTo(viewLogService.getProgressOfCourse(userId, c2.getId()))));
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> getCourseFromCourseEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }
}
