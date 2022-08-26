package io.coursemela.coursemela.plan.model;


import io.coursemela.coursemela.course.model.Course;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Plan {
    Long id;
    String title;
    ZonedDateTime startTime;
    ZonedDateTime endTime;
    List<Course> courses;
}
