package io.coursemela.coursemela.video.repository;

import io.coursemela.coursemela.video.entity.ViewLogEntity;
import io.coursemela.coursemela.video.entity.ViewLogKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ViewLogRepository extends JpaRepository<ViewLogEntity, ViewLogKey> {
    Optional<ViewLogEntity> findByIdStudentIdAndIdVideoId(Long studentId, Long videoId);
}