package io.coursemela.coursemela.course.model;


import io.coursemela.coursemela.course.entity.TopicEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Topic {
    private Long id;
    private Subject subject;
    private String name;

    public Topic(TopicEntity topic)
    {
        this.id = topic.getId();
        this.subject = new Subject(topic.getSubjectEntity());
        this.name = topic.getName();
    }
}
