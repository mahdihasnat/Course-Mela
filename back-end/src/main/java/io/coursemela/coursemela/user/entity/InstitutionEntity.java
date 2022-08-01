package io.coursemela.coursemela.user.entity;

import io.coursemela.coursemela.user.model.Institution;
import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@ToString(exclude = "userEntities")
@EqualsAndHashCode(exclude = "userEntities")
@NoArgsConstructor
public class InstitutionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String location;
    private String description;

    @ManyToMany
    private Set<UserEntity> userEntities;

    public InstitutionEntity(Institution institution)
    {
        this.id = institution.getId();
        this.name = institution.getName();
        this.location = institution.getLocation();
        this.description = institution.getDescription();
    }
}
