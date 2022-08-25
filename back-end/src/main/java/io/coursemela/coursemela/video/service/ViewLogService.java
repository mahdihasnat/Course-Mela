package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.VideoLog;
import io.coursemela.coursemela.video.model.ViewLogStatDTO;

public interface ViewLogService {
    Long addVideoLog(VideoLog videoLog,
                     Long studentId) throws Exception;

    Long updateVideoLog(VideoLog videoLog,
                        Long studentId) throws Exception;

    ViewLogStatDTO getViewLogStat(Long userId, int dayCount);
}
