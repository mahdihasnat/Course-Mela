package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.user.service.UserService;
import io.coursemela.coursemela.video.model.Video;
import io.coursemela.coursemela.video.service.VideoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.ZonedDateTime;
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


    @PutMapping(value = "/increase-like/{videoId}")
    public ResponseEntity<Video> increaseLike(@PathVariable Long videoId) {
        return ResponseEntity.ok(videoService.increaseLike(videoId));
    }

    @PutMapping(value = "/decrease-like/{videoId}")
    public ResponseEntity<Video> decreaseLike(@PathVariable Long videoId) {
        return ResponseEntity.ok(videoService.decreaseLike(videoId));
    }


    @Autowired
    private UserService userService;

    @PostMapping(value = "log/add")
    public ResponseEntity<Boolean> addVideoLog(@RequestBody Long videoId,
                                               @RequestBody Duration watchTime,
                                               @RequestBody Duration lastVisitDuration) {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(videoService.addVideoLog(videoId, userId, watchTime, lastVisitDuration, ZonedDateTime.now()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(false);
        }
    }

}
