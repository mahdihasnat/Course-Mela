package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Topic;
import io.coursemela.coursemela.course.service.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/topic")
public class TopicController {

    @Autowired
    private TopicService topicService;
    @GetMapping("/{subjectId}")
    List<Topic> getTopicBySubjectId(@PathVariable Long subjectId)
    {
        System.out.println("SubjectId:"+subjectId);
        return topicService.getTopicBySubjectId(subjectId);
    }

}
