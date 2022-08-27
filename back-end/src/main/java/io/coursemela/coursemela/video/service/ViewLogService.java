package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.VideoLog;
import io.coursemela.coursemela.video.model.ViewLogStatDTO;

import java.time.ZonedDateTime;

public interface ViewLogService {
    Long addVideoLog(VideoLog videoLog,
                     Long studentId) throws Exception;

    Long updateVideoLog(VideoLog videoLog,
                        Long studentId) throws Exception;

    ViewLogStatDTO getViewLogStat(Long userId, int dayCount);

    ViewLogStatDTO getViewLogStatOfCourse(Long userId, int dayCount, Long courseId);

    Double getTotalTimeOfVideoBetween(Long videoId, ZonedDateTime startTime, ZonedDateTime endTime);

    Integer getTotalViewOfVideoBetween(Long videoId,
                                       ZonedDateTime startTime,
                                       ZonedDateTime endTime);
}
