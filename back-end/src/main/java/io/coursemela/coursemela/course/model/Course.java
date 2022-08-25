package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.instructor.model.Instructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Slf4j
public class Course {
    private Long id;
    private Instructor instructor;
    private Topic topic;
    private String name;
    private String coverPhotoPath;
    private String description;
    private List<Tag> tags;

    CoursePricing coursePricing;

}