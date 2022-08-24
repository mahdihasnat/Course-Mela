package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.video.enemuration.ClarificationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
public class ClarificationEntity extends DoubtEntity {

    ClarificationStatus clarificationStatus;

    @ManyToOne()
    DoubtEntity parentDoubtEntity;
}
