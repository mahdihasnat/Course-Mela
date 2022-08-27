package io.coursemela.coursemela.video.model;


import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class VideoWatchTimeRequestDTO {
    ZonedDateTime startTime;
    ZonedDateTime endTime;
}
