package io.coursemela.coursemela.user.entity;


import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.user.model.User;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    protected Long id;

    @Column(nullable = false, unique = true)
    protected String userName;

    protected String firstName;

    protected String lastName;

    @Column(nullable = false, unique = true)
    protected String email;


    protected String passsword;

//    ''' '''
    /// make mobile phone oneTomany
    protected String mobileNo;


    private Date dateOfJoin;

    public UserEntity(User user){
        this.id = user.getId();
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.passsword = user.getPasssword();
        this.mobileNo = user.getMobileNo();
        this.dateOfJoin = user.getDateOfJoin();
    }

    public UserEntity(String userName, String firstName, String lastName, String email, String passsword, String mobileNo, Date dateOfJoin) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passsword = passsword;
        this.mobileNo = mobileNo;
        this.dateOfJoin = dateOfJoin;
    }

    public UserEntity() {
    }
}