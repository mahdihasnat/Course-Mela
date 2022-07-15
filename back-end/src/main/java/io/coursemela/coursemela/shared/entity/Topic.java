package io.coursemela.coursemela.shared.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Data
@ToString
@Entity
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;














    @ManyToOne
    private Subject subject;

    @Column(nullable = false)
    private String name;


    public Topic(Long id, Subject subject, String name) {
        this.id = id;
        this.subject = subject;
        this.name = name;
    }


    public Topic() {
    }
}
