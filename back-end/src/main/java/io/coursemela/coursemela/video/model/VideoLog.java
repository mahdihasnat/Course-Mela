package io.coursemela.coursemela.video.model;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class VideoLog {
    Long videoId;
    Double watchTime;
    Double lastVisitDuration;
    ZonedDateTime visitTime;
}
