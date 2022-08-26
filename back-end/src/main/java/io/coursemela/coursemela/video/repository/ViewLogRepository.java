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

    // select sum(watch_time) from viewLog entity where studentid = ? and visitTime >= ?

    @Query(value = "SELECT sum(watchTime) FROM ViewLogEntity WHERE student_entity_id = ?1 and visit_time >= ?2")
    Double getTotalWatchTime(Long studentId, ZonedDateTime time);


    // select count(distinct videoid) from viewLog entity where studentid = ? and visitTime >= ? and videoid in (select videoid from video entity where courseid = ?)
    @Query(value = "SELECT count(distinct video_entity_id) FROM ViewLogEntity WHERE student_entity_id = ?1 and visit_time >= ?2 and video_entity_id in (select id from VideoEntity where course_entity_id = ?3)")
    Long getVideoCountOfCourse(Long studentId, ZonedDateTime time, Long courseId);


    // select sum(watch_time) from viewLog entity where studentid = ? and visitTime >= ? and videoid in (select videoid from video entity where courseid = ?)
    @Query(value = "SELECT sum(watchTime) FROM ViewLogEntity WHERE student_entity_id = ?1 and visit_time >= ?2 and video_entity_id in (select id from VideoEntity where course_entity_id = ?3)")
    Double getTotalWatchTimeOfCourse(Long studentId, ZonedDateTime time, Long courseId);

    //    select avg( min(1.0, (select sum(watch_time) from ViewLogEntity where student_entity_id = ? and video_entity_id = id ) /duration  )  ) from VideoEntity where course_entity_id = ?
    @Query(value = "SELECT avg( (select sum(watchTime) from ViewLogEntity where student_entity_id = ?1 and video_entity_id = _video.id ) / _video.duration  )  from VideoEntity _video where course_entity_id = ?2")
    Double getProgressOfCourse(Long studentId, Long courseId);

}