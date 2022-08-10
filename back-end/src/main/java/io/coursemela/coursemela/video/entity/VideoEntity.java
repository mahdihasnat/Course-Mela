package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.course.entity.CourseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    Long likeCount;
    Integer serial;
    Boolean hidden;
}













