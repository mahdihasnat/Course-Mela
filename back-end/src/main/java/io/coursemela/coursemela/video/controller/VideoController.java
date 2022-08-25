package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.user.service.UserService;
import io.coursemela.coursemela.video.model.Video;
import io.coursemela.coursemela.video.model.VideoLog;
import io.coursemela.coursemela.video.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        // log.info(videoUrl);
        return videoService.updateVideoUrl(new Long(videoId), videoUrl);
    }

    @PostMapping(value = "/updateThumbUrl")
    public Video saveVideoUrl(@RequestParam Long videoId, @RequestParam String thumbUrl) {
        return videoService.updateThumbUrl(videoId, thumbUrl);
    }

    @GetMapping(value = "/getVideo/{videoId}")
    public Video getVideoById(@PathVariable String videoId) {
        return videoService.getVideoById(new Long(videoId));
    }

    @GetMapping(value = "/getVideoByCourse/{courseId}")
    public List<Video> getAllVideosByCourse(@PathVariable Long courseId) {
        return videoService.getAllVideoByCourse(courseId);
    }

    @GetMapping(value = "/getSimilarVideo/{videoId}")
    public ResponseEntity<List<Video>> getSimilarVideos(@PathVariable Long videoId) {
        return ResponseEntity.ok(videoService.getSimilarVideos(videoId));
    }

    @Autowired
    private UserService userService;

    @PutMapping(value = "log/update")
    public ResponseEntity<Long> updateVideoLog(@RequestBody VideoLog videoLog) {
        try {
            log.info(videoLog.toString());
            Long userId = userService.getUserId();
            return ResponseEntity.ok(videoService.updateVideoLog(videoLog, userId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(-1L);
        }
    }

    @PostMapping(value = "log/add")
    public ResponseEntity<Long> addVideoLog(@RequestBody VideoLog videoLog) {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(videoService.addVideoLog(videoLog, userId));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(-1L);
        }
    }

}
