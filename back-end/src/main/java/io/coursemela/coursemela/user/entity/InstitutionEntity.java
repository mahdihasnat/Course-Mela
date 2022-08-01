package io.coursemela.coursemela.user.entity;

import io.coursemela.coursemela.user.model.Institution;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class InstitutionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;
    private String location;
    private String description;
    
    public InstitutionEntity(Institution institution)
    {
        this.id = institution.getId();
        this.name = institution.getName();
        this.location = institution.getLocation();
        this.description = institution.getDescription();
    }
}
