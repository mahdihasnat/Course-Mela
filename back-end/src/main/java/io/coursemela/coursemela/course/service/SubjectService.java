package io.coursemela.coursemela.course.service;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import io.coursemela.coursemela.course.model.Subject;
import io.coursemela.coursemela.course.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public Optional<Subject> getSubject(Long id)
    {
        Optional<SubjectEntity> subjectEntity = subjectRepository.findById(id);
        return subjectEntity.map(subject -> new Subject(subject.getId(), subject.getName()));
    }
    public List<Subject> getAllSubject()
    {
        List<SubjectEntity> subjectEntities = subjectRepository.findAll();
        List<Subject> subjects = subjectEntities
                .stream()
                .map(sub -> new Subject(
                        sub.getId(),
                        sub.getName()
                        ))
                .collect(Collectors.toList());
        return  subjects;
    }
}
