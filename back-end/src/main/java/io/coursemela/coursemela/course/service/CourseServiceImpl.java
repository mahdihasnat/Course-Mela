package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.CourseTagEntity;
import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.course.repository.CourseTagRepository;
import io.coursemela.coursemela.shared.util.UrlCollections;
import io.coursemela.coursemela.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
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

        course = applicationContext.getBean(Course.class);
        course.initFromEntity(courseEntity);

        return course;
    }

    @Override
    public List<Course> getCourses() {
        List<CourseEntity> courseEntities = courseRepository.findAll();
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> applicationContext.getBean(Course.class)
                        .initFromEntity(courseEntity))
                .collect(Collectors.toList());
        return courses;
    }

    @Override
    public Course getCourse(Long id) {
        CourseEntity courseEntity = courseRepository.findById(id).orElse(null);
        Course course = applicationContext.getBean(Course.class)
                .initFromEntity(courseEntity);
        return course;
    }

    @Override
    public List<Course> getCourseByInstructorUserName(String userName) {
        List<CourseEntity> courseEntities = courseRepository.findAllByInstructorEntityUserName(userName);
        log.info(courseEntities.toString());
        List<Course> courses = courseEntities
                .stream()
                .map(courseEntity -> applicationContext.getBean(Course.class)
                        .initFromEntity(courseEntity))
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
        course.setCover_photo_path(url);
        courseRepository.save(course);
        return true;

//        return true

    }
}
