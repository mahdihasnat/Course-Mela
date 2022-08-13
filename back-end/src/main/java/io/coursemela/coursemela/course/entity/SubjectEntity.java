package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.course.model.Subject;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class SubjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    public SubjectEntity(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public SubjectEntity() {
    }

    public SubjectEntity(Subject subject) {
        this.id = subject.getId();
        this.name = subject.getName();
    }

    @Override
    public String toString() {
        return "Subject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
