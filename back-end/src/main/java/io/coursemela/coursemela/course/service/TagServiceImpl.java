package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.TagEntity;
import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.course.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepository;

    @Override
    public Tag createTag(Tag tag) {
        TagEntity tagEntity = TagEntity.builder()
                .name(tag.getName())
                .build();
        tagEntity = tagRepository.save(tagEntity);
        tag = new Tag(tagEntity);
        return tag;
    }

    @Override
    public List<Tag> getTags() {
        List<TagEntity> tagEntities = tagRepository.findAll();
        return tagEntities
                .stream()
                .map(Tag::new)
                .collect(Collectors.toList());
    }
}
