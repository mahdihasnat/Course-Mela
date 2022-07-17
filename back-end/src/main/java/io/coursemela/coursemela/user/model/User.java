package io.coursemela.coursemela.user.model;

import io.coursemela.coursemela.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    protected Long id;
    protected String userName;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String password;
    protected String mobileNo;
    protected Date dateOfJoin;
    public User(UserEntity userEntity)
    {
        this.id = userEntity.getId();
        this.userName = userEntity.getUserName();
        this.firstName = userEntity.getFirstName();
        this.lastName = userEntity.getLastName();
        this.email = userEntity.getEmail();
        this.password = userEntity.getPasssword();
        this.mobileNo = userEntity.getMobileNo();
        this.dateOfJoin = userEntity.getDateOfJoin();
    }


    public void encodePassword(){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(this.password);
    }

}
