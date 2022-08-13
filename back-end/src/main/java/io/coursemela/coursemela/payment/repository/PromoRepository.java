package io.coursemela.coursemela.payment.repository;

import io.coursemela.coursemela.payment.entity.PromoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoRepository extends JpaRepository<PromoEntity, Long> {
}