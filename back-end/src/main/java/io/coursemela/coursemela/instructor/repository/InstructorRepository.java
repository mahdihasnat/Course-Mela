package io.coursemela.coursemela.instructor.repository;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstructorRepository extends JpaRepository<InstructorEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<InstructorEntity> findByUserName(String userName);
}

















