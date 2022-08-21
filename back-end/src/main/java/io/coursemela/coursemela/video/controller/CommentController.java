package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.user.service.UserService;
import io.coursemela.coursemela.video.model.Comment;
import io.coursemela.coursemela.video.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("comment")
@Slf4j
public class CommentController {

    @Autowired
    CommentService commentService;
    @Autowired
    UserService userService;

    @GetMapping("video/{videoId}")
    ResponseEntity<List<Comment>> getCommentsFromVideo(@PathVariable("videoId") Long videoId) {
        
        return ResponseEntity.ok(commentService.getCommentsFromVideo(videoId));
    }

    @PostMapping("video/{videoId}/add")
    ResponseEntity addComment(@RequestParam("videoId") Long videoId, @RequestBody String text) {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(commentService.createDoubt(videoId, userId, text));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }
}
