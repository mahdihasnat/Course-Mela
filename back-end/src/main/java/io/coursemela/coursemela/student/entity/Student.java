package io.coursemela.coursemela.student.entity;
import io.coursemela.coursemela.user.entity.UserEntity;

import io.coursemela.coursemela.shared.entity.Level;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;


@Entity
@Getter@Setter
public class Student extends UserEntity {


    @Enumerated(EnumType.ORDINAL)
    private Level _level;

    public Student(String userName, String firstName, String lastName, String email, String passsword, String mobileNo, Date dateOfJoin, Level _level) {
        super(userName, firstName, lastName, email, passsword, mobileNo, dateOfJoin);
        this._level = _level;
    }

    public Student(){super();}
}
