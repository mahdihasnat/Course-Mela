package io.coursemela.coursemela.student.entity;

import io.coursemela.coursemela.payment.entity.StudentPromoEntity;
import io.coursemela.coursemela.payment.entity.SubscriptionEntity;
import io.coursemela.coursemela.student.model.Student;
import io.coursemela.coursemela.user.entity.UserEntity;
import io.coursemela.coursemela.video.entity.ViewLogEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import java.util.Date;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
public class StudentEntity extends UserEntity {
    @Enumerated(EnumType.ORDINAL)
    private Level level;

    @OneToMany(mappedBy = "studentEntity")
    Set<StudentPromoEntity> studentPromoEntities;

    @OneToMany(mappedBy = "studentEntity")
    Set<SubscriptionEntity> subscriptionEntities;

    @OneToMany(mappedBy = "studentEntity")
    Set<ViewLogEntity> viewLogEntities;

    public StudentEntity(String userName, String firstName, String lastName, String email, String passsword, String mobileNo, Date dateOfJoin, Level level) {
        super(userName, firstName, lastName, email, passsword, mobileNo, dateOfJoin);
        this.level = level;
    }

    public StudentEntity(Student student) {
        super(student);
        this.setLevel(student.getLevel());
    }
}
