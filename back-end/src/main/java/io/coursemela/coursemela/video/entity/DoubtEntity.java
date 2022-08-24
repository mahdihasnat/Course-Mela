package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.ZonedDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
public class DoubtEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private VideoEntity videoEntity;

    @ManyToOne
    private UserEntity userEntity;

    private String text;
    private ZonedDateTime postTime;
}
