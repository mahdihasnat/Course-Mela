package io.coursemela.coursemela.video.model;

import io.coursemela.coursemela.video.enemuration.ClarificationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Comment {
    private Long id;
    private String text;
    private ZonedDateTime postTime;
    private ClarificationStatus clarificationStatus;
    List<Comment> replies;
}
