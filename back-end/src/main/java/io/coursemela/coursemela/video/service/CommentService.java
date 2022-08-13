package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsFromVideo(Long videoId);

    Comment createDoubt(Long videoId, Long studentId, String text) throws Exception;
}
