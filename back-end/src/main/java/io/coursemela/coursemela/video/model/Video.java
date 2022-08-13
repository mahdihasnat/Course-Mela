package io.coursemela.coursemela.video.model;

import io.coursemela.coursemela.video.entity.VideoEntity;
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


    public Video(VideoEntity videoEntity) {
        this.courseId = videoEntity.getCourseEntity().getId();
        this.id = videoEntity.getId();
        this.title = videoEntity.getTitle();
        this.description = videoEntity.getDescription();
        this.likeCount = videoEntity.getLikeCount();
        this.serial = videoEntity.getSerial();
        this.hidden = videoEntity.getHidden();
        this.videoPath = videoEntity.getVideoPath();
        this.thumbPath = videoEntity.getThumbPath();
    }


}


