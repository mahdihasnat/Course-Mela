package io.coursemela.coursemela.student.entity;

import io.coursemela.coursemela.student.model.Student;
import io.coursemela.coursemela.user.entity.UserEntity;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.util.Date;


@Entity
@Data
public class StudentEntity extends UserEntity {


    @Enumerated(EnumType.ORDINAL)
    private Level level;

    public StudentEntity(String userName, String firstName, String lastName, String email, String passsword, String mobileNo, Date dateOfJoin, Level level) {
        super(userName, firstName, lastName, email, passsword, mobileNo, dateOfJoin);
        this.level = level;
    }

    public StudentEntity() {
        super();
    }

    public StudentEntity(Student student) {
        super(student);
        this.setLevel(student.getLevel());
    }
}
