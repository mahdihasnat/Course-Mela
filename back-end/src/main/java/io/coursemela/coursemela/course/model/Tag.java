package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.course.entity.CourseTagEntity;
import io.coursemela.coursemela.course.entity.TagEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    private Long id;
    private String name;
    public Tag(TagEntity tagEntity)
    {
        this.id = tagEntity.getId();
        this.name = tagEntity.getName();
    }
}
