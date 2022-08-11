package io.coursemela.coursemela.video.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.video.entity.VideoEntity;
import io.coursemela.coursemela.video.model.Video;
import io.coursemela.coursemela.video.repository.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public Video createVideoMetadata(Video video) throws Exception {
        CourseEntity courseEntity = courseRepository.findById(video.getCourseId()).stream().findFirst().orElse(null);
//        courseEntity.orElseThrow(())
//        if(courseEntity.isPresent()) {

            VideoEntity videoEntity = new VideoEntity(courseEntity, video);
            System.out.println(videoEntity);
            videoRepository.save(videoEntity);
            System.out.println("after : " + videoEntity);


        return new Video(videoEntity);
//        }else{
//            throw new Exception("Course Entity not found" + courseId);
//        }


    }


    @Override
    public Video updateVideoUrl(Long videoId, String videoUrl) {
        VideoEntity videoEntity = videoRepository.findById(videoId).stream().findFirst().orElse(null);
        videoEntity.setVideoPath(videoUrl);
        videoRepository.save(videoEntity);
        return new Video(videoEntity);
    }
}
