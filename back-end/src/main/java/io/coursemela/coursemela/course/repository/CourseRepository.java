package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<CourseEntity,Long>{
//	List<CourseEntity> findCourseEntitiesByTagId(Long tagId);
}
