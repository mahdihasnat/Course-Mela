package io.coursemela.coursemela.video.repository;

import io.coursemela.coursemela.video.entity.ViewLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViewLogRepository extends JpaRepository<ViewLogEntity, Long> {
    List<ViewLogEntity> findAllByStudentEntityIdAndVideoEntityId(Long studentId, Long videoId);
}