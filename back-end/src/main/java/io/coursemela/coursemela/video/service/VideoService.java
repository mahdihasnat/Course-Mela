package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Video;
import io.coursemela.coursemela.video.model.VideoLog;

import java.util.List;


public interface VideoService {
    Video createVideoMetadata(Video video) throws Exception;

    Video updateVideoUrl(Long videoId, String videoUrl);

    Video getVideoById(Long videoId);

    List<Video> getAllVideoByCourse(Long courseId);

    Video updateThumbUrl(Long videoId, String thumbUrl);

    List<Video> getSimilarVideos(Long videoId);


    Long addVideoLog(VideoLog videoLog,
                     Long studentId) throws Exception;

    Long updateVideoLog(VideoLog videoLog,
                        Long studentId) throws Exception;
}
