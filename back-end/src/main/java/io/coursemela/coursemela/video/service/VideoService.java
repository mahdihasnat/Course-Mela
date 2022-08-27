package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Video;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.List;


public interface VideoService {
    Video createVideoMetadata(Video video) throws Exception;

    Video updateVideoUrl(Long videoId, String videoUrl);

    Video getVideoById(Long videoId);

    List<Video> getAllVideoByCourse(Long courseId);

    Video updateThumbUrl(Long videoId, String thumbUrl);

    List<Video> getSimilarVideos(Long videoId);


    Video increaseLike(Long videoId);

    Video decreaseLike(Long videoId);

    Long totalVideoCountOfCourse(Long courseId);


    Boolean addVideoLog(Long videoId,
                        Long studentId,
                        Duration watchTime,
                        Duration lastVisitDuration,
                        ZonedDateTime lastVisitTime);

}
