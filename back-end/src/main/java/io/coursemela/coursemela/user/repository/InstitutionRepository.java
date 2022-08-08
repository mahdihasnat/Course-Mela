package io.coursemela.coursemela.user.repository;

import io.coursemela.coursemela.user.entity.InstitutionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstitutionRepository extends JpaRepository<InstitutionEntity,Long> {

}
