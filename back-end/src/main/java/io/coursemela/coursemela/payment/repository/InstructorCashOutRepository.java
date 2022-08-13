package io.coursemela.coursemela.payment.repository;

import io.coursemela.coursemela.payment.entity.InstructorCashOutEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstructorCashOutRepository extends JpaRepository<InstructorCashOutEntity, Long> {
}