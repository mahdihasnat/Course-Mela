package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.course.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<TopicEntity, Long> {

    List<TopicEntity> findAllBySubjectId(Long subjectId);
}

