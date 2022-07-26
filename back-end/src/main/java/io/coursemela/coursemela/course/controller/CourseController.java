package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.service.CourseService;
import io.coursemela.coursemela.instructor.service.InstructorService;
import io.coursemela.coursemela.storage.StorageService;
import io.coursemela.coursemela.user.context.UserContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/course")
@Slf4j
@RestController
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private StorageService storageService;

    @PostMapping(value = "/")
    Course createCourse(@RequestBody Course course) {
        try {
            System.out.println("course:" + course.toString());
            // System.out.println("file:"+coverImage);
            if (course.getTags() == null)
                course.setTags(new ArrayList<>());
            String currentUserName = UserContext.getUserName();
            course.setInstructor(instructorService.getInstructor(currentUserName));
            course = courseService.createCourse(course);
            return course;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }

    }

    @PostMapping(value="updateCoverImage")
    public Course updateCoverImage(@RequestParam("id") Long id, @RequestParam("coverImage")MultipartFile coverImage)
    {
        try {
            storageService.store(coverImage);
//            courseService.updateCoverImage(id, coverImage);
            System.out.println();
            log.info("IMPLEMENT UPDATE COVER IMAGE CODE HERE");
            return null;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/")
    List<Course> getCourses(){
        return courseService.getCourses();
    }


}
