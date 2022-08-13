package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.ZonedDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class DoubtEntity {
    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    VideoEntity videoEntity;

    @ManyToOne
    StudentEntity studentEntity;

    private String text;
    private ZonedDateTime postTime;
}
