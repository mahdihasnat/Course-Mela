package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import io.coursemela.coursemela.course.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {
    Optional<SubjectEntity> findById(Long subjectId);
}

