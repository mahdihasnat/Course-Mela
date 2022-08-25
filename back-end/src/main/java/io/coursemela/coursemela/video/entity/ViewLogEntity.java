package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.Duration;
import java.time.ZonedDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ViewLogEntity {

    @Id
    @GeneratedValue
    Long id;
    @ManyToOne
    StudentEntity studentEntity;
    @ManyToOne
    VideoEntity videoEntity;

    Duration watchTime;
    Duration lastVisitDuration;
    ZonedDateTime visitTime;
}
