package io.coursemela.coursemela.instructor.model;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Instructor extends User {
    private double credit;
    private String bio;

    public Instructor(InstructorEntity instructorEntity){
        super(instructorEntity);
        this.credit = instructorEntity.getCredit();
        this.bio = instructorEntity.getBio();
    }
}
