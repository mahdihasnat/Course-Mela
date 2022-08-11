package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Video;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface VideoService {
    Video createVideoMetadata(Video video) throws Exception;

    Video updateVideoUrl(Long videoId, String videoUrl);

    Video getVideoById(Long videoId);

    List<Video> getAllVideoByCourse(Long courseId);
}
