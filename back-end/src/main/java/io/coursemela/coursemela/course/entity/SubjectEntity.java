package io.coursemela.coursemela.course.entity;

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

    @Override
    public String toString() {
        return "Subject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
