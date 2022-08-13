package io.coursemela.coursemela.video.repository;

import io.coursemela.coursemela.video.entity.DoubtEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoubtRepository extends JpaRepository<DoubtEntity, Long> {
    List<DoubtEntity> findByVideoEntityId(Long videoEntityId);
}