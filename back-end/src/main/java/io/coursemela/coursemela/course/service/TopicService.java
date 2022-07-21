package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.model.Topic;

import java.util.List;

public interface TopicService {
    List<Topic> getTopicBySubjectId(Long subjectId);
}
