package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.service.CourseService;
import io.coursemela.coursemela.instructor.service.InstructorService;
import io.coursemela.coursemela.user.context.UserContext;
import io.coursemela.coursemela.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping(value = "/")
    Course createCourse(@RequestBody Course course) {
        try {
            System.out.println("course:" + course.toString());
            if (course.getTags() == null)
                course.setTags(new ArrayList<>());
            String currentUserName = UserContext.getUserName();
            course.setInstructor(instructorService.getInstructor(currentUserName));
            course = courseService.createCourse(course);
            return course;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    @PostMapping(value = "updateCoverImage")
    public ResponseEntity<Boolean> updateCoverImage(@RequestParam("id") String id,
            @RequestParam("coverImage") MultipartFile coverImage) {
        try {
            // coverImage.

            // storageService.store(coverImage, id);
            // System.out.println();
            // log.info("IMPLEMENT UPDATE COVER IMAGE CODE HERE");
            // return null;
            return ResponseEntity.ok(courseService.updateCourseCoverImageLocation(id, coverImage));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping("/")
    List<Course> getCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/{courseId}")
    Course getCourse(@PathVariable("courseId") String courseId) {
        log.info("get course: " + courseId);
        return courseService.getCourse(Long.valueOf(courseId));

    }

    @Autowired
    UserService userService;

}
