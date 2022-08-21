package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Duration;
import java.time.ZonedDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ViewLogEntity {
    @EmbeddedId
    ViewLogKey id;

    @ManyToOne
    @MapsId("studentId")
    @JoinColumn(name = "studentId")
    StudentEntity studentEntity;

    @ManyToOne
    @MapsId("videoId")
    @JoinColumn(name = "videoId")
    VideoEntity videoEntity;

    Duration watchTime;
    Duration lastVisitDuration;
    ZonedDateTime lastVisitTime;
}
