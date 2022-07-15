package io.coursemela.coursemela.shared.entity;

import lombok.Data;

import javax.persistence.*;


@Data
@Entity
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    public Subject(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Subject() {
    }

    @Override
    public String toString() {
        return "Subject{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
