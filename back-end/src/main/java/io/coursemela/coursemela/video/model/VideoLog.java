package io.coursemela.coursemela.video.model;

import lombok.Builder;
import lombok.Data;

import java.time.Duration;
import java.time.ZonedDateTime;

@Data
@Builder
public class VideoLog {
    Long videoId;
    Duration watchTime;
    Duration lastVisitDuration;
    ZonedDateTime visitTime;
}
