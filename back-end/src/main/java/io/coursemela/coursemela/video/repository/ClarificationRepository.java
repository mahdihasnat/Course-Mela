package io.coursemela.coursemela.video.repository;

import io.coursemela.coursemela.video.entity.ClarificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClarificationRepository extends JpaRepository<ClarificationEntity, Long> {
    List<ClarificationEntity> findAllByParentDoubtEntityId(Long id);
}