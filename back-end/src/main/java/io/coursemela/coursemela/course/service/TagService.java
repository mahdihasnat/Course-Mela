package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.model.Tag;

import java.util.List;

public interface TagService {
    Tag createTag(Tag tag);

    List<Tag> getTags();
}
