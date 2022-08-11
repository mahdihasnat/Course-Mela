package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.video.model.Video;
import io.coursemela.coursemela.video.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/video")
public class VideoController {
    @Autowired
    private VideoService videoService;

    @PostMapping(value = "/newVideo", consumes = "application/json")
    public Video saveVideoMetadataToDatabase(
            @RequestBody Video video
    ) throws Exception {

        return videoService.createVideoMetadata(video);

    }
}
