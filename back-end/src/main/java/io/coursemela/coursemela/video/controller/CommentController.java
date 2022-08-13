package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.video.model.Comment;
import io.coursemela.coursemela.video.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @GetMapping("video/{videoId}")
    ResponseEntity<List<Comment>> getCommentsFromVideo(@RequestParam("videoId") Long videoId) {
        return ResponseEntity.ok(commentService.getCommentsFromVideo(videoId));
    }
}
