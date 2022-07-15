package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.course.model.Subject;
import io.coursemela.coursemela.course.model.Topic;
import io.coursemela.coursemela.course.repository.SubjectRepository;
import io.coursemela.coursemela.course.repository.TopicRepository;
import net.bytebuddy.description.NamedElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;

//    @Autowired
//    private SubjectService subjectService;

    List<Topic> getTopicBySubjectId(Long subjectId)
    {
        List<TopicEntity> topicEntities = topicRepository.findAllBySubjectId(subjectId);
        List<Topic> topics = topicEntities
                .stream()
                .map(topic -> new Topic(topic))
                .collect(Collectors.toList());
        return topics;
    }

}
