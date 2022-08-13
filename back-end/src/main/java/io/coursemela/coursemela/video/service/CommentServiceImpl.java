package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.repository.StudentRepository;
import io.coursemela.coursemela.video.enemuration.ClarificationStatus;
import io.coursemela.coursemela.video.entity.DoubtEntity;
import io.coursemela.coursemela.video.entity.VideoEntity;
import io.coursemela.coursemela.video.model.Comment;
import io.coursemela.coursemela.video.repository.DoubtRepository;
import io.coursemela.coursemela.video.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    DoubtRepository doubtRepository;
    @Autowired
    StudentRepository studentRepository;
    @Autowired
    VideoRepository videoRepository;

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


    @Override
    public Comment createDoubt(Long videoId, Long studentId, String text) throws Exception {
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoId);
        if (!optionalVideoEntity.isPresent()) {
            throw new Exception("Video not found");
        }
        Optional<StudentEntity> optionalStudentEntity = studentRepository.findById(studentId);
        if (!optionalStudentEntity.isPresent()) {
            throw new Exception("Student not found");
        }
//        TODO: check if student has access to this video
        DoubtEntity doubtEntity = DoubtEntity.builder()
                .videoEntity(optionalVideoEntity.get())
                .studentEntity(optionalStudentEntity.get())
                .text(text)
                .postTime(ZonedDateTime.now())
                .build();
        doubtEntity = doubtRepository.save(doubtEntity);
        return Comment.builder()
                .id(doubtEntity.getId())
                .text(doubtEntity.getText())
                .postTime(doubtEntity.getPostTime())
                .clarificationStatus(ClarificationStatus.APPROVED)
                .replies(new ArrayList<>())
                .build();
    }
}
