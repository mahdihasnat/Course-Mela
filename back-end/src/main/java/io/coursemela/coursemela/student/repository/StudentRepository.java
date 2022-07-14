package io.coursemela.coursemela.student.repository;

import io.coursemela.coursemela.shared.entity.User;
import io.coursemela.coursemela.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<User> findByEmail(String email);
}
