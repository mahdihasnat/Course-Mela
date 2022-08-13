package io.coursemela.coursemela;


import io.coursemela.coursemela.course.entity.TagEntity;
import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.course.repository.TagRepository;
import io.coursemela.coursemela.course.service.TagServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class TagServiceTest {

    @Mock
    private TagRepository tagRepository;

    @InjectMocks
    private TagServiceImpl tagService;

    @Test
    public void createTag() {

        TagEntity tagEntity = TagEntity.builder()
                .id(123L)
                .name("simple")
                .build();

        Tag tag = new Tag(tagEntity);

        when(tagRepository.save(any())).thenReturn(tagEntity);

        Tag tag1 = tagService.createTag(tag);

        assertEquals(tag1, tag);
    }


}
