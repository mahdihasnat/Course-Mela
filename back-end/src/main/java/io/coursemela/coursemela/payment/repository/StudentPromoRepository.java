package io.coursemela.coursemela.payment.repository;

import io.coursemela.coursemela.payment.entity.StudentPromoEntity;
import io.coursemela.coursemela.payment.entity.StudentPromoKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentPromoRepository extends JpaRepository<StudentPromoEntity, StudentPromoKey> {
}