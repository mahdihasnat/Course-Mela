package io.coursemela.coursemela.course.controller;

import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.course.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping("/")
    Tag createTag(@RequestBody Tag tag)
    {
        System.out.println("post req tag="+tag);
        return tagService.createTag(tag);
    }

}
