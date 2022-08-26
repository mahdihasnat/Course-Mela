package io.coursemela.coursemela.student.service;

import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.model.Student;
import io.coursemela.coursemela.student.repository.StudentRepository;
import io.coursemela.coursemela.user.entity.InstitutionEntity;
import io.coursemela.coursemela.user.service.AddressService;
import io.coursemela.coursemela.user.service.InstitutionService;
import io.coursemela.coursemela.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@Slf4j
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

    @Autowired
    AddressService addressService;

    @Autowired
    InstitutionService institutionService;

    public Student getStudentFromStudentEntity(StudentEntity studentEntity) {

        Student student = Student.builder()
                .id(studentEntity.getId())
                .userName(studentEntity.getUserName())
                .firstName(studentEntity.getFirstName())
                .lastName(studentEntity.getLastName())
                .email(studentEntity.getEmail())
                .password(studentEntity.getPassword())
                .mobileNo(studentEntity.getMobileNo())
                .dateOfJoin(studentEntity.getDateOfJoin())
                .address(addressService.getAddressFromAddressEntity(
                                studentEntity.getAddress()
                        )
                )
                .institutions(new HashSet<>())
                .level(studentEntity.getLevel())
                .build();
        try {
            for (InstitutionEntity institutionEntity :
                    studentEntity.getInstitutionEntities())
                student.getInstitutions().add(
                        institutionService.
                                getInstitutionFromInstitutionEntity(
                                        institutionEntity
                                )
                );
        } catch (NullPointerException e) {
            log.trace(e.getStackTrace().toString());
        }
        return student;
    }
}
