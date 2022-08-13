package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.video.model.Comment;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Override
    public List<Comment> getCommentsFromVideo(Long videoId) {
        List<Comment> comments = new ArrayList<>();
        comments.add(Comment.builder()
                .id(1L)
                .text("sample comment")
                .postTime(ZonedDateTime.now())
                .replies(null)
                .build());
        return comments;
    }
}
