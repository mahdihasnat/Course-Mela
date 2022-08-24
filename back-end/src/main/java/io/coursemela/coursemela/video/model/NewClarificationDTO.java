package io.coursemela.coursemela.video.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewClarificationDTO {
    private Long videoId;
    private Long parentClarificationId;
    private String text;
}
