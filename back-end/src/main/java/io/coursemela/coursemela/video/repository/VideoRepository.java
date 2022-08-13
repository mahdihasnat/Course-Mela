package io.coursemela.coursemela.video.repository;

import io.coursemela.coursemela.video.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, Long> {
    List<VideoEntity> findByCourseEntityId(Long courseId);
    
}