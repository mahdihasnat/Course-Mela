package io.coursemela.coursemela.video.entity;

import lombok.AllArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@AllArgsConstructor

public class ViewLogKey implements Serializable {
    @Column(name = "studentId")
    Long studentId;
    @Column(name = "videoId")
    Long videoId;
}
