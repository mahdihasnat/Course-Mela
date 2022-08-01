package io.coursemela.coursemela.user.model;

import io.coursemela.coursemela.user.entity.InstitutionEntity;
import lombok.Data;

@Data
public class Institution {
    private Long id;

    private String name;
    private String location;
    private String description;

    public Institution(InstitutionEntity institution)
    {
        this.id = institution.getId();
        this.name = institution.getName();
        this.location = institution.getLocation();
        this.description = institution.getDescription();
    }
}
