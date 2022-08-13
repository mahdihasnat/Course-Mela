package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.course.model.Topic;
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
    private SubjectEntity subjectEntity;

    @Column(nullable = false)
    private String name;

    public TopicEntity(Long id, SubjectEntity subjectEntity, String name) {
        this.id = id;
        this.subjectEntity = subjectEntity;
        this.name = name;
    }

    public TopicEntity(Topic topic) {
        this.id = topic.getId();
        this.subjectEntity = new SubjectEntity(topic.getSubject());
    }

    public TopicEntity() {

    }
}
