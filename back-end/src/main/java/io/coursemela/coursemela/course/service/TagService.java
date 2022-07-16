package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.TagEntity;
import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.course.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {
    @Autowired
    private TagRepository tagRepository;

    public Tag createTag(Tag tag){
        TagEntity tagEntity = new TagEntity();
        tagEntity.setId(tag.getId());
        tagEntity.setName(tag.getName());
        tagEntity = tagRepository.save(tagEntity);
        tag.setId(tagEntity.getId());
        tag.setName(tagEntity.getName());
        return  tag;
    }

    public List<Tag> getTags(){
        List<TagEntity> tagEntities =tagRepository.findAll();
        List<Tag> tags = tagEntities
                .stream()
                .map( tag-> new Tag(tag) )
                .collect(Collectors.toList());
        return tags;
    }
}
