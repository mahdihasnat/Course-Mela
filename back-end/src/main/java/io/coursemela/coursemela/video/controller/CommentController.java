package io.coursemela.coursemela.video.controller;

import io.coursemela.coursemela.shared.model.CustomJson;
import io.coursemela.coursemela.user.service.UserService;
import io.coursemela.coursemela.video.model.Comment;
import io.coursemela.coursemela.video.model.NewClarificationDTO;
import io.coursemela.coursemela.video.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;

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
    ResponseEntity addComment(@PathVariable("videoId") Long videoId, @RequestBody CustomJson json) {
        try {
            Long userId = userService.getUserId();

            JsonNode jsonNode = json.getJsonNode();
            String text = jsonNode.asText();

            return ResponseEntity.ok(commentService.createDoubt(videoId, userId, text));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PostMapping("reply/add")
    ResponseEntity addReply(@RequestBody NewClarificationDTO newClarificationDTO) {
        try {
            Long userId = userService.getUserId();
            return ResponseEntity.ok(commentService.createClarification(
                    newClarificationDTO.getParentClarificationId(),
                    newClarificationDTO.getVideoId(),
                    userId,
                    newClarificationDTO.getText()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{commentId}")
    ResponseEntity deleteComment(@PathVariable("commentId") Long commentId) {
        try {
            commentService.deleteComment(commentId);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/approve/{commentId}")
    ResponseEntity approveComment(@PathVariable("commentId") Long commentId) {
        try {
            commentService.approveComment(commentId);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

}
