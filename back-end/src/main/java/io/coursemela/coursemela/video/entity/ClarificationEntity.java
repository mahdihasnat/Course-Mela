package io.coursemela.coursemela.video.entity;

import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.video.enemuration.ClarificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.time.ZonedDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ClarificationEntity extends DoubtEntity {

    ClarificationStatus clarificationStatus;

    @ManyToOne()
    DoubtEntity parentDoubtEntity;

    @Builder(builderMethodName = "ClarificationEntityBuilder")
    public ClarificationEntity(Long id, VideoEntity videoEntity, StudentEntity studentEntity, String text, ZonedDateTime postTime, ClarificationStatus clarificationStatus, DoubtEntity parentDoubtEntity) {
        super(id, videoEntity, studentEntity, text, postTime);
        this.clarificationStatus = clarificationStatus;
        this.parentDoubtEntity = parentDoubtEntity;
    }
}
