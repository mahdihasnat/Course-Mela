package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.CourseTagEntity;
import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.course.repository.CourseTagRepository;
import io.coursemela.coursemela.shared.util.BaseUrl;
import io.coursemela.coursemela.storage.StorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Course getCourse(Long id){
        CourseEntity courseEntity = courseRepository.findById(id).orElse(null);
        Course course = new Course(courseEntity);
        return course;
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


    @Override
    public boolean updateCourseCoverImageLocation(String courseId, MultipartFile file) {
        Path path = storageService.store(file, courseId);
        log.info("path file name: " + path.getFileName().toString());
        log.info(path.toString());
        System.out.println(path);


        String url = BaseUrl.getBaseUrl() + "/fileserver/image/?fileId=" + courseId;
        CourseEntity course = courseRepository.findById(Long.valueOf(courseId)).get();
        course.setCover_photo_path(url);
        courseRepository.save(course);
        return true;

//        return true

    }
}