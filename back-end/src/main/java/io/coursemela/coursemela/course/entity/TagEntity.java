package io.coursemela.coursemela.course.entity;

import io.coursemela.coursemela.course.model.Tag;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@ToString(exclude = "courseTagEntities")
@EqualsAndHashCode(exclude = "courseTagEntities")
@Builder
@AllArgsConstructor
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(nullable = false, unique = true)
    String name;

    @OneToMany(mappedBy = "tagEntity")
    Set<CourseTagEntity> courseTagEntities;

    public TagEntity(Tag tag) {
        this.id = tag.getId();
        this.name = tag.getName();
    }

}
