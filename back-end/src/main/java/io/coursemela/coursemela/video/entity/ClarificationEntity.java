package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.video.enemuration.ClarificationStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@SuperBuilder
@Setter
public class ClarificationEntity extends DoubtEntity {

    ClarificationStatus clarificationStatus;

    @ManyToOne()
    DoubtEntity parentDoubtEntity;
}
