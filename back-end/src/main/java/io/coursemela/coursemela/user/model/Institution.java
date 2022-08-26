package io.coursemela.coursemela.user.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Institution {
    private Long id;

    private String name;
    private String location;
    private String description;
    
}
