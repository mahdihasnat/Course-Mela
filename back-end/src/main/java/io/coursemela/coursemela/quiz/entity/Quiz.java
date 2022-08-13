package io.coursemela.coursemela.quiz.entity;

import io.coursemela.coursemela.course.entity.CourseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.Duration;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Quiz {
    @Id
    private Long id;

    @ManyToOne
    CourseEntity courseEntity;

    private String name;
    private Duration duration;
    private int serial;
}
