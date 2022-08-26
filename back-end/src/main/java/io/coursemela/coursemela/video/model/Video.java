package io.coursemela.coursemela.video.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@Data
//@Scope("prototype")
@Builder
@NoArgsConstructor
public class Video implements Serializable {
    private Long courseId;
    private Long id;
    private String title;
    private String description;
    private Long likeCount;
    private Integer serial;
    private Boolean hidden;

    private String videoPath;
    private String thumbPath;
    private Double duration;


}


