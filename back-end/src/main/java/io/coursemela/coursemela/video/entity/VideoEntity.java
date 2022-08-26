package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.course.entity.CourseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class VideoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @ManyToOne
    CourseEntity courseEntity;

    String videoPath;
    String thumbPath;

    String title;
    String description;

    @Builder.Default
    private Long likeCount = Long.valueOf(0);
    Integer serial;
    Boolean hidden;
    Double duration;

    @OneToMany(mappedBy = "videoEntity")
    Set<ViewLogEntity> viewLogEntities;

}













