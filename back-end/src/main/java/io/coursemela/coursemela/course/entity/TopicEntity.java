package io.coursemela.coursemela.course.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@Entity
public class TopicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private SubjectEntity subject;

    @Column(nullable = false)
    private String name;

    public TopicEntity(Long id, SubjectEntity subject, String name) {
        this.id = id;
        this.subject = subject;
        this.name = name;
    }

    public TopicEntity() {
    }
}
