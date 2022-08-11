package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.video.model.Video;
import io.coursemela.coursemela.video.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/video")
@Slf4j
public class VideoController {
    @Autowired
    private VideoService videoService;

    @PostMapping(value = "/newVideo", consumes = "application/json")
    public Video saveVideoMetadataToDatabase(
            @RequestBody Video video) throws Exception {

        return videoService.createVideoMetadata(video);

    }

    @PostMapping(value = "/updateVideoUrl")
    public Video saveVideoUrl(@RequestParam String videoId, @RequestParam String videoUrl) {
        log.info(videoUrl);
        return videoService.updateVideoUrl(new Long(videoId), videoUrl);
    }

    @GetMapping(value = "/getVideo/{videoId}")
    public Video getVideoById(@PathVariable String videoId) {
        return videoService.getVideoById(new Long(videoId));
    }

    @GetMapping(value = "/getVideoByCourse/{courseId}")
    public List<Video> getAllVideosByCourse(@PathVariable Long courseId) {
        return videoService.getAllVideoByCourse(courseId);
    }
}
