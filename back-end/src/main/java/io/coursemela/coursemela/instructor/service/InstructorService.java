package io.coursemela.coursemela.instructor.service;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
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

    public Instructor getInstructorFromInstructorEntity(InstructorEntity instructorEntity) {
        return ((Instructor) userService.getUserFromUserEntity(instructorEntity))
                .toBuilder()
                .credit(instructorEntity.getCredit())
                .bio(instructorEntity.getBio())
                .build();
    }

}
