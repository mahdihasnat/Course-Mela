package io.coursemela.coursemela.video.repository;

import io.coursemela.coursemela.video.entity.ViewLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface ViewLogRepository extends JpaRepository<ViewLogEntity, Long> {
    List<ViewLogEntity> findAllByStudentEntityIdAndVideoEntityId(Long studentId, Long videoId);

    List<ViewLogEntity> findAllByStudentEntityIdAndVisitTimeGreaterThanEqual(Long studentId, ZonedDateTime time);

    // select count(distinct videoid) from viewLog entity where studentid = ? and visitTime >= ?
    @Query(value = "SELECT count(distinct video_entity_id) FROM ViewLogEntity WHERE student_entity_id = ?1 and visit_time >= ?2")
    Long getVideoCount(Long studentId, ZonedDateTime time);
}