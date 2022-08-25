package io.coursemela.coursemela.video.model;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class VideoLog {
    Long id;
    Long videoId;
    Double watchTime;
    Double lastVisitPoint;
    ZonedDateTime visitTime;
}
