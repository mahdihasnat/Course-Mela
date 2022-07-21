package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.model.Subject;

import java.util.List;
import java.util.Optional;

public interface SubjectService {
    Optional<Subject> getSubject(Long id);

    List<Subject> getAllSubject();
}
