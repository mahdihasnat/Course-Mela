package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsFromVideo(Long videoId);
}
