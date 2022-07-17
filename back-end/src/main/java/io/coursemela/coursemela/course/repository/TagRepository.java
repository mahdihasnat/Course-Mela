package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.entity.TagEntity;
import io.coursemela.coursemela.course.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<TagEntity,Long> {
    List<TagEntity> findTagEntitiesByCourseTagEntitiesCourseEntityId(Long courseId);
}
