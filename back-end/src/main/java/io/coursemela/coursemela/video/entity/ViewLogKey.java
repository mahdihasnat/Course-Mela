package io.coursemela.coursemela.video.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public
class ViewLogKey implements Serializable {
    @Column(name = "studentId")
    Long studentId;
    @Column(name = "videoId")
    Long videoId;
}
