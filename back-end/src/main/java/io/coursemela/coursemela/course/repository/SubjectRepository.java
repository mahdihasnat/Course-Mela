package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectEntity, Long> {

}

