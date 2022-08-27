package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.user.service.UserService;
import io.coursemela.coursemela.video.model.VideoLog;
import io.coursemela.coursemela.video.model.VideoWatchTimeRequestDTO;
import io.coursemela.coursemela.video.model.ViewLogStatDTO;
import io.coursemela.coursemela.video.service.ViewLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/video/log")
public class ViewLogController {

    @Autowired
    private UserService userService;

    @Autowired
    private ViewLogService viewLogService;

    @PutMapping(value = "/update")
    public ResponseEntity<Long> updateVideoLog(@RequestBody VideoLog videoLog) {
        try {
            log.info(videoLog.toString());
            Long userId = userService.getUserId();
            if (userService.isInstructor(userId))
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            return ResponseEntity.ok(viewLogService.updateVideoLog(videoLog, userId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(-1L);
        }
    }


    @PostMapping(value = "add")
    public ResponseEntity<Long> addVideoLog(@RequestBody VideoLog videoLog) {
        try {
            Long userId = userService.getUserId();
            if (userService.isInstructor(userId))
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
            videoLog.setVisitTime(ZonedDateTime.now());
            return ResponseEntity.ok(viewLogService.addVideoLog(videoLog, userId));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(-1L);
        }
    }

    @GetMapping(value = "getStat/{dayCount}")
    ResponseEntity<ViewLogStatDTO> getViewLogStat(@PathVariable("dayCount") int dayCount) {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(viewLogService.getViewLogStat(userId, dayCount));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @PostMapping(value = "getStats")
    ResponseEntity<List<ViewLogStatDTO>> getViewLogStats(@RequestBody List<Integer> dayCounts) {
        try {
            Long userId = userService.getUserId();
            List<ViewLogStatDTO> ret = dayCounts.stream().map(dayCount -> {
                return viewLogService.getViewLogStat(userId, dayCount);
            }).collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
            return ResponseEntity.ok(ret);
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @GetMapping(value = "getStatOfCourse/{dayCount}/{courseId}")
    ResponseEntity<ViewLogStatDTO> getViewLogStatOfCourse(@PathVariable("dayCount") int dayCount, @PathVariable("courseId") Long courseId) {
        try {
            log.debug("dayCount: " + dayCount + " courseId: " + courseId);
            Long userId = userService.getUserId();
            return ResponseEntity.ok(viewLogService.getViewLogStatOfCourse(userId, dayCount, courseId));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }


    @PostMapping(value = "getWatchTimeOfVideo/{videoId}")
    ResponseEntity getWatchTimeOfVideo(@PathVariable("videoId") Long videoId,
                                       @RequestBody List<VideoWatchTimeRequestDTO>
                                               videoWatchTimeRequestDTOs) {
        try {
            return ResponseEntity.ok(
                    videoWatchTimeRequestDTOs.stream().map(
                            videoWatchTimeRequestDTO ->
                                    viewLogService.getTotalTimeOfVideoBetween(videoId,
                                            videoWatchTimeRequestDTO.getStartTime(),
                                            videoWatchTimeRequestDTO.getEndTime()) / 60.0
                    ).collect(Collectors.toList()));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @PostMapping(value = "getWatchCountOfVideo/{videoId}")
    ResponseEntity getWatchCountOfVideo(@PathVariable("videoId") Long videoId,
                                        @RequestBody List<VideoWatchTimeRequestDTO>
                                                videoWatchTimeRequestDTOs) {
        try {
            return ResponseEntity.ok(
                    videoWatchTimeRequestDTOs.stream().map(
                            videoWatchTimeRequestDTO ->
                                    viewLogService.getTotalViewOfVideoBetween(videoId,
                                            videoWatchTimeRequestDTO.getStartTime(),
                                            videoWatchTimeRequestDTO.getEndTime())
                    ).collect(Collectors.toList()));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

}
