package io.coursemela.coursemela.instructor.entity;

import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.user.entity.UserEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;

//@NoArgsConstructor
@Getter@Setter
@Entity
public class InstructorEntity extends UserEntity {

    @Column(columnDefinition = "double precision default 0.00")
    private double credit;

    private String bio;

    public InstructorEntity(String userName, String firstName, String lastName, String email, String passsword, String mobileNo, Date dateOfJoin, double credit, String bio) {
        super(userName, firstName, lastName, email, passsword, mobileNo, dateOfJoin);
        this.credit = credit;
        this.bio = bio;
    }

    public InstructorEntity(Instructor instructor)
    {
        super(instructor);
        this.credit = instructor.getCredit();
        this.bio = instructor.getBio();
    }

}
