package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.CourseTagEntity;
import io.coursemela.coursemela.course.entity.CourseTagKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseTagRepository extends JpaRepository<CourseTagEntity, CourseTagKey> {

}
