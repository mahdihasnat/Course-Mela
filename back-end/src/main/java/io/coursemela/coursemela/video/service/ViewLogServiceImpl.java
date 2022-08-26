package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.repository.StudentRepository;
import io.coursemela.coursemela.video.entity.VideoEntity;
import io.coursemela.coursemela.video.entity.ViewLogEntity;
import io.coursemela.coursemela.video.model.VideoLog;
import io.coursemela.coursemela.video.model.ViewLogStatDTO;
import io.coursemela.coursemela.video.repository.VideoRepository;
import io.coursemela.coursemela.video.repository.ViewLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ViewLogServiceImpl implements ViewLogService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ViewLogRepository viewLogRepository;

    @Autowired
    private StudentRepository studentRepository;


    @Override
    public Long addVideoLog(VideoLog videoLog,
                            Long studentId) throws Exception {
        Optional<StudentEntity> optionalStudentEntity = studentRepository.findById(studentId);
        if (!optionalStudentEntity.isPresent())
            throw new Exception("Student not found");
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoLog.getVideoId());
        if (!optionalVideoEntity.isPresent())
            throw new Exception("Video not found");

        ViewLogEntity viewLogEntity = null;
        viewLogEntity = ViewLogEntity.builder()
                .watchTime(0.0)
                // .lastVisitPoint(videoLog.getLastVisitPoint())
                .visitTime(videoLog.getVisitTime())
                .studentEntity(optionalStudentEntity.get())
                .videoEntity(optionalVideoEntity.get())
                .build();

        viewLogEntity = viewLogRepository.save(viewLogEntity);
        return viewLogEntity.getId();
    }

    @Override
    public Long updateVideoLog(VideoLog videoLog, Long studentId) throws Exception {
        Optional<StudentEntity> optionalStudentEntity = studentRepository.findById(studentId);
        if (!optionalStudentEntity.isPresent())
            throw new Exception("Student not found");
        Optional<VideoEntity> optionalVideoEntity = videoRepository.findById(videoLog.getVideoId());
        if (!optionalVideoEntity.isPresent())
            throw new Exception("Video not found");

        ViewLogEntity viewLogEntity = null;
        viewLogEntity = viewLogRepository.findById(videoLog.getId()).get();
        viewLogEntity.setWatchTime(viewLogEntity.getWatchTime() + videoLog.getWatchTime());
        viewLogEntity.setLastVisitPoint(videoLog.getLastVisitPoint());

        viewLogEntity = viewLogRepository.save(viewLogEntity);
        return viewLogEntity.getId();
    }

    @Override
    public ViewLogStatDTO getViewLogStat(Long userId, int dayCount) {
        List<ViewLogEntity> viewLogEntities = viewLogRepository
                .findAllByStudentEntityIdAndVisitTimeGreaterThanEqual(userId, ZonedDateTime.now().minusDays(dayCount));
        Long videoCount = viewLogRepository.getVideoCount(userId, ZonedDateTime.now().minusDays(dayCount));
        Double totalWatchTime = viewLogRepository.getTotalWatchTime(userId, ZonedDateTime.now().minusDays(dayCount));
        ViewLogStatDTO viewLogStatDTO = ViewLogStatDTO.builder()
                .totalVideWatched(videoCount)
                .totalDurationWatched(totalWatchTime)
                .totalQuizAttempted(0L)
                .performanceScore(0.0)
                .build();
        return viewLogStatDTO;
    }

    @Override
    public ViewLogStatDTO getViewLogStatOfCourse(Long userId, int dayCount, Long courseId) {

        List<ViewLogEntity> viewLogEntities = viewLogRepository
                .findAllByStudentEntityIdAndVisitTimeGreaterThanEqual(userId, ZonedDateTime.now().minusDays(dayCount));
        Long videoCount = viewLogRepository.getVideoCountOfCourse(userId, ZonedDateTime.now().minusDays(dayCount), courseId);
        Double totalWatchTime = viewLogRepository.getTotalWatchTimeOfCourse(userId, ZonedDateTime.now().minusDays(dayCount), courseId);
        Double progress = viewLogRepository.getProgressOfCourse(userId, courseId);
        progress = Math.min(progress, 1.0);
        ViewLogStatDTO viewLogStatDTO = ViewLogStatDTO.builder()
                .totalVideWatched(videoCount)
                .totalDurationWatched(totalWatchTime)
                .totalQuizAttempted(0L)
                .performanceScore(0.0)
                .progress(progress)
                .build();
        return viewLogStatDTO;

    }


}
