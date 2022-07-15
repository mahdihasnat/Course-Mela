package io.coursemela.coursemela.course.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(nullable = false)
    String name;
}
