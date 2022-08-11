package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Duration;
import java.time.ZonedDateTime;

@Embeddable
class ViewLogKey implements Serializable {
    @Column(name = "studentId")
    Long studentId;
    @Column(name = "videoId")
    Long videoId;
}

@Entity
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
