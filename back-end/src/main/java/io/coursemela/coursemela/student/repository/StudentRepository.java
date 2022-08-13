package io.coursemela.coursemela.student.repository;

import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.user.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findByUserName(String userName);
}
