package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<TopicEntity, Long> {

    List<TopicEntity> findAllBySubjectEntityId(Long subjectId);
}

