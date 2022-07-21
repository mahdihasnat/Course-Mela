package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.course.model.Topic;
import io.coursemela.coursemela.course.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicServiceImpl implements TopicService {
    @Autowired
    private TopicRepository topicRepository;

    @Override
    public List<Topic> getTopicBySubjectId(Long subjectId)
    {
        List<TopicEntity> topicEntities = topicRepository.findAllBySubjectEntityId(subjectId);
        List<Topic> topics = topicEntities
                .stream()
                .map(topic -> new Topic(topic))
                .collect(Collectors.toList());
        return topics;
    }

}
