package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.course.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping("/")
    List<Tag> getTags(){
        return tagService.getTags();
    }
    
}
