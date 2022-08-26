package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.user.entity.UserEntity;
import io.coursemela.coursemela.user.repository.UserRepository;
import io.coursemela.coursemela.video.enemuration.ClarificationStatus;
import io.coursemela.coursemela.video.entity.ClarificationEntity;
import io.coursemela.coursemela.video.entity.DoubtEntity;
import io.coursemela.coursemela.video.entity.VideoEntity;
import io.coursemela.coursemela.video.model.Comment;
import io.coursemela.coursemela.video.repository.ClarificationRepository;
import io.coursemela.coursemela.video.repository.DoubtRepository;
import io.coursemela.coursemela.video.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

        @Autowired
        DoubtRepository doubtRepository;
        @Autowired
        UserRepository userRepository;
        @Autowired
        VideoRepository videoRepository;

        @Autowired
        private ClarificationRepository clarificationRepository;

        public Comment getCommentFromClarificationEntity(ClarificationEntity clarificationEntity) {
                Comment comment = Comment.builder()
                                .id(clarificationEntity.getId())
                                .text(clarificationEntity.getText())
                                .postTime(clarificationEntity.getPostTime())
                                .clarificationStatus(clarificationEntity.getClarificationStatus())
                                .userId(clarificationEntity.getUserEntity().getId())
                                .userName(clarificationEntity.getUserEntity().getUserName())
                                .replies(new ArrayList())
                                .build();

                List<ClarificationEntity> clarificationEntities = clarificationRepository
                                .findAllByParentDoubtEntityId(clarificationEntity.getId());
                comment.setReplies(
                                clarificationEntities.stream()
                                                .map(tmp -> getCommentFromClarificationEntity(tmp))
                                                .collect(Collectors.toList()));
                return comment;
        }

        public Comment getCommentFromDoubtEntity(DoubtEntity doubtEntity) {
                Comment comment = Comment.builder()
                                .id(doubtEntity.getId())
                                .text(doubtEntity.getText())
                                .postTime(doubtEntity.getPostTime())
                                .clarificationStatus(ClarificationStatus.APPROVED)
                                .userId(doubtEntity.getUserEntity().getId())
                                .userName(doubtEntity.getUserEntity().getUserName())
                                .replies(new ArrayList<>())
                                .build();
                List<ClarificationEntity> clarificationEntities = clarificationRepository
                                .findAllByParentDoubtEntityId(doubtEntity.getId());
                comment.setReplies(
                                clarificationEntities.stream()
                                                .map(clarificationEntity -> getCommentFromClarificationEntity(
                                                                clarificationEntity))
                                                .collect(Collectors.toList()));
                return comment;
        }

        @Override
        public List<Comment> getCommentsFromVideo(Long videoId) {
                List<DoubtEntity> doubtEntities = doubtRepository.findByVideoEntityId(videoId);
                List<Comment> comments = doubtEntities.stream()
                                .map(
                                                tmp -> getCommentFromDoubtEntity(tmp))
                                .collect(Collectors.toList());
                return comments;
                // List<Comment> comments = new ArrayList<>();
                // comments.add(Comment.builder()
                // .id(1L)
                // .text("sample comment")
                // .postTime(ZonedDateTime.now())
                // .replies(null)
                // .build());

                // return comments;
        }

        @Override
        public Comment createDoubt(Long videoId, Long userId, String text) throws Exception {
                Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoId);
                if (!optionalVideoEntity.isPresent()) {
                        throw new Exception("Video not found");
                }
                Optional<UserEntity> optionalUserEntity = userRepository.findById(userId);
                if (!optionalUserEntity.isPresent()) {
                        throw new Exception("User not found");
                }
                // TODO: check if student has access to this video
                DoubtEntity doubtEntity = DoubtEntity.builder()
                                .videoEntity(optionalVideoEntity.get())
                                .userEntity(optionalUserEntity.get())
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

        @Override
        public Comment createClarification(Long parentClarificationId,
                        Long videoId,
                        Long userId,
                        String text) throws Exception {

                Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoId);
                if (!optionalVideoEntity.isPresent()) {
                        throw new Exception("Video not found");
                }
                Optional<UserEntity> optionalUserEntity = userRepository.findById(userId);
                if (!optionalUserEntity.isPresent()) {
                        throw new Exception("User not found");
                }
                // TODO: sanity check
                Optional<DoubtEntity> optionalDoubtEntity = doubtRepository.findById(parentClarificationId);
                if (!optionalDoubtEntity.isPresent())
                        throw new Exception("Parent Clarification not found");

                ClarificationEntity clarificationEntity = ClarificationEntity.builder()
                                .videoEntity(null)
                                .userEntity(optionalUserEntity.get())
                                .text(text)
                                .postTime(ZonedDateTime.now())
                                .clarificationStatus(ClarificationStatus.PENDING)
                                .parentDoubtEntity(optionalDoubtEntity.get())
                                .build();
                clarificationRepository.save(clarificationEntity);
                return getSingleCommentFromClarificationEntity(clarificationEntity);
        }

        private Comment getSingleCommentFromClarificationEntity(ClarificationEntity clarificationEntity) {
                return Comment.builder()
                                .id(clarificationEntity.getId())
                                .text(clarificationEntity.getText())
                                .postTime(clarificationEntity.getPostTime())
                                .clarificationStatus(clarificationEntity.getClarificationStatus())
                                .userId(clarificationEntity.getUserEntity().getId())
                                .userName(clarificationEntity.getUserEntity().getUserName())
                                .replies(new ArrayList<>())
                                .build();
        }

        @Override
        public Boolean deleteComment(Long commentId) {
                Optional<ClarificationEntity> optionalClarificationEntity = clarificationRepository.findById(commentId);
                if (optionalClarificationEntity.isPresent()) {
                        ClarificationEntity clarificationEntity = optionalClarificationEntity.get();
                        clarificationEntity.setClarificationStatus(ClarificationStatus.REJECTED);
                        clarificationRepository.save(clarificationEntity);
                        return true;
                }
                return false;
        }

        @Override
        public Boolean approveComment(Long commentId) {
                Optional<ClarificationEntity> optionalClarificationEntity = clarificationRepository.findById(commentId);
                if (optionalClarificationEntity.isPresent()) {
                        ClarificationEntity clarificationEntity = optionalClarificationEntity.get();
                        clarificationEntity.setClarificationStatus(ClarificationStatus.APPROVED);
                        clarificationRepository.save(clarificationEntity);
                        return true;
                }
                return false;
        }
}
