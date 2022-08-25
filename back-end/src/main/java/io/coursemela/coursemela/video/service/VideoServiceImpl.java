package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.repository.StudentRepository;
import io.coursemela.coursemela.video.entity.VideoEntity;
import io.coursemela.coursemela.video.entity.ViewLogEntity;
import io.coursemela.coursemela.video.model.Video;
import io.coursemela.coursemela.video.model.VideoLog;
import io.coursemela.coursemela.video.repository.VideoRepository;
import io.coursemela.coursemela.video.repository.ViewLogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Video createVideoMetadata(Video video) throws Exception {
        CourseEntity courseEntity = courseRepository.findById(video.getCourseId()).stream().findFirst().orElse(null);
        // courseEntity.orElseThrow(())
        // if(courseEntity.isPresent()) {

        VideoEntity videoEntity = VideoEntity.builder()
                .courseEntity(courseEntity)
                .videoPath(video.getVideoPath())
                .thumbPath(video.getThumbPath())
                .title(video.getTitle())
                .description(video.getDescription())
                .serial(video.getSerial())
                .hidden(video.getHidden())
                .build();

        System.out.println(videoEntity);
        videoRepository.save(videoEntity);
        System.out.println("after : " + videoEntity);

        return new Video(videoEntity);
        // }else{
        // throw new Exception("Course Entity not found" + courseId);
        // }

    }

    @Override
    public Video updateVideoUrl(Long videoId, String videoUrl) {
        VideoEntity videoEntity = videoRepository.findById(videoId).stream().findFirst().orElse(null);
        videoEntity.setVideoPath(videoUrl);
        videoRepository.save(videoEntity);
        return new Video(videoEntity);
    }

    @Override
    public Video updateThumbUrl(Long videoId, String thumbUrl) {
        VideoEntity videoEntity = videoRepository.findById(videoId).stream().findFirst().orElse(null);
        videoEntity.setThumbPath(thumbUrl);
        videoRepository.save(videoEntity);
        return new Video(videoEntity);
    }

    @Override
    public Video getVideoById(Long videoId) {
        VideoEntity videoEntity = videoRepository.findById(videoId).stream().findFirst().orElse(null);
        return new Video(videoEntity);
    }

    @Override
    public List<Video> getAllVideoByCourse(Long courseId) {
        List<VideoEntity> videoEntities = videoRepository.findByCourseEntityId(courseId);
        List<Video> videos = videoEntities.stream().map((video) -> new Video(video)).collect(Collectors.toList());
        log.info(videos.toString());
        return videos;
    }

    @Override
    public List<Video> getSimilarVideos(Long videoId) {
        Optional<VideoEntity> videoEntity = videoRepository.findById(videoId);
        if (!videoEntity.isPresent())
            return null;
        Long courseId = videoEntity.get().getCourseEntity().getId();
        return getVideosFromVideoEntities(
                videoRepository.findByCourseEntityId(courseId));
    }

    @Autowired
    private ViewLogRepository viewLogRepository;

    @Autowired
    private StudentRepository studentRepository;

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

    private Video getVideoFromVideoEntity(VideoEntity videoEntity) {
        return Video.builder()
                .courseId(videoEntity.getCourseEntity().getId())
                .id(videoEntity.getId())
                .title(videoEntity.getTitle())
                .description(videoEntity.getDescription())
                .likeCount(videoEntity.getLikeCount())
                .serial(videoEntity.getSerial())
                .hidden(videoEntity.getHidden())
                .videoPath(videoEntity.getVideoPath())
                .thumbPath(videoEntity.getThumbPath())
                .build();
    }

    private List<Video> getVideosFromVideoEntities(List<VideoEntity> videoEntities) {
        return videoEntities.stream()
                .map(videoEntity -> getVideoFromVideoEntity(videoEntity))
                .collect(Collectors.toList());
    }

}
