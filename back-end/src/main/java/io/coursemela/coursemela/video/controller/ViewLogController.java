package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.user.service.UserService;
import io.coursemela.coursemela.video.model.VideoLog;
import io.coursemela.coursemela.video.model.ViewLogStatDTO;
import io.coursemela.coursemela.video.service.ViewLogService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
            log.info(dayCounts.toString());
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
            Long userId = userService.getUserId();
            return ResponseEntity.ok(viewLogService.getViewLogStatOfCourse(userId, dayCount, courseId));
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
}