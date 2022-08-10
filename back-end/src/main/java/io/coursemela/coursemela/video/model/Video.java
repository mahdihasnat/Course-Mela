package io.coursemela.coursemela.video.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@AllArgsConstructor
@Data
public class Video implements Serializable {
    private Long id;
    private String title;
    private String description;
    private Long likeCount;
    private Integer serial;
    private Boolean hidden;
}
