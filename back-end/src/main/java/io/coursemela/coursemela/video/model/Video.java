package io.coursemela.coursemela.video.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
public class Video implements Serializable {
    private final Long id;
    private final String title;
    private final String description;
    private final Long likeCount;
    private final Integer serial;
    private final Boolean hidden;
}
