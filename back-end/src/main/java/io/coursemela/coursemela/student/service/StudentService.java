package io.coursemela.coursemela.student.service;

import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.model.Student;
import io.coursemela.coursemela.student.repository.StudentRepository;
import io.coursemela.coursemela.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student createStudent(Student student) {
        StudentEntity studentEntity = new StudentEntity(student);
        studentEntity = studentRepository.save(studentEntity);
        return getStudentFromStudentEntity(studentEntity);
    }

    @Autowired
    UserService userService;

    public Student getStudentFromStudentEntity(StudentEntity studentEntity) {
        return ((Student) userService.getUserFromUserEntity(studentEntity)).toBuilder()
                .level(studentEntity.getLevel())
                .build();
    }
}
