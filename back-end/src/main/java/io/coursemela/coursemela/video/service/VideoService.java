package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Video;
import org.springframework.stereotype.Service;

@Service
public interface VideoService {
    Video createVideoMetadata(Video video) throws Exception;

    Video updateVideoUrl(Long videoId, String videoUrl);
}
