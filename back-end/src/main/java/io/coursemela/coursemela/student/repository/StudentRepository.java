package io.coursemela.coursemela.student.repository;

import io.coursemela.coursemela.student.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
