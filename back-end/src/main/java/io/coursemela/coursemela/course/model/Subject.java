package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subject {
    private Long id;
    private String name;
    public Subject(SubjectEntity subject) {
        this.id = subject.getId();
        this.name = subject.getName();
    }
}
