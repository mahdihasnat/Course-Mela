package io.coursemela.coursemela.instructor.service;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.user.entity.InstitutionEntity;
import io.coursemela.coursemela.user.service.AddressService;
import io.coursemela.coursemela.user.service.InstitutionService;
import io.coursemela.coursemela.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@Service
@Slf4j
public class InstructorService {

    @Autowired
    private InstructorRepository instructorRepository;

    public Instructor getInstructor(String userName) {
        Optional<InstructorEntity> instructor = instructorRepository.findByUserName(userName);
        if (!instructor.isPresent())
            return null;
        return getInstructorFromInstructorEntity(instructor.get());
    }

    public Instructor createInstructor(Instructor instructor) {
        InstructorEntity instructorEntity = new InstructorEntity(instructor);
        instructorEntity = instructorRepository.save(instructorEntity);
        return getInstructorFromInstructorEntity(instructorEntity);
    }

    @Autowired
    UserService userService;

    @Autowired
    AddressService addressService;

    @Autowired
    InstitutionService institutionService;


    public Instructor getInstructorFromInstructorEntity(InstructorEntity instructorEntity) {

        Instructor instructor = Instructor.builder()
                .id(instructorEntity.getId())
                .userName(instructorEntity.getUserName())
                .firstName(instructorEntity.getFirstName())
                .lastName(instructorEntity.getLastName())
                .email(instructorEntity.getEmail())
                .password(instructorEntity.getPassword())
                .mobileNo(instructorEntity.getMobileNo())
                .dateOfJoin(instructorEntity.getDateOfJoin())
                .address(addressService.getAddressFromAddressEntity(
                                instructorEntity.getAddress()
                        )
                )
                .institutions(new HashSet<>())
                .credit(instructorEntity.getCredit())
                .bio(instructorEntity.getBio())
                .build();
        try {
            for (InstitutionEntity institutionEntity :
                    instructorEntity.getInstitutionEntities())
                instructor.getInstitutions().add(
                        institutionService.
                                getInstitutionFromInstitutionEntity(
                                        institutionEntity
                                )
                );
        } catch (NullPointerException e) {
            log.trace(e.getStackTrace().toString());
        }
        return instructor;
    }

}
