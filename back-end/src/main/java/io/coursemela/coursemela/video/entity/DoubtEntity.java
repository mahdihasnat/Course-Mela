package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.ZonedDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoubtEntity {
    @Id
    Long id;

    @ManyToOne
    VideoEntity videoEntity;

    @ManyToOne
    StudentEntity studentEntity;

    private String text;
    private ZonedDateTime postTime;
}
