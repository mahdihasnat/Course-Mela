package io.coursemela.coursemela.video.repository;

import io.coursemela.coursemela.video.entity.ViewLogEntity;
import io.coursemela.coursemela.video.entity.ViewLogKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViewLogRepository extends JpaRepository<ViewLogEntity, ViewLogKey> {
}