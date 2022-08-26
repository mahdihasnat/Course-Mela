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
//    TODO: change logic to fetch only subscribed course
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

//        return true

    }

    @Autowired
    InstructorService instructorService;

    Course getCourseFromCourseEntity(CourseEntity courseEntity) {
        Course course = Course.builder()
                .id(courseEntity.getId())
                .instructor(instructorService.getInstructorFromInstructorEntity(
                                courseEntity.getInstructorEntity()
                        )
                )
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
}
