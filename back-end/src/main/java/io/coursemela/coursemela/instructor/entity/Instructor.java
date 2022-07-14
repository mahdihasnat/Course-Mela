package io.coursemela.coursemela.instructor.entity;

import io.coursemela.coursemela.shared.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;

@NoArgsConstructor
@Getter@Setter
@Entity
public class Instructor extends User {

    @Column(columnDefinition = "double precision default 0.00")
    private double credit;

    private String bio;

    public Instructor( String firstName, String lastName, String email, String passsword, String mobileNo, Date dateOfJoin, double credit, String bio) {
        super(firstName, lastName, email, passsword, mobileNo, dateOfJoin);
        this.credit = credit;
        this.bio = bio;
    }


}
