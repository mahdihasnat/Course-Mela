package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentsFromVideo(Long videoId);

    Comment createDoubt(Long videoId, Long userId, String text) throws Exception;

    Comment createClarification(Long parentClarificationId,
                                Long videoId,
                                Long userId,
                                String text) throws Exception;

}
