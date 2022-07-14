package io.coursemela.coursemela.instructor.repository;

import io.coursemela.coursemela.instructor.entity.Instructor;
import io.coursemela.coursemela.shared.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    Optional<User> findByEmail(String email);
}
