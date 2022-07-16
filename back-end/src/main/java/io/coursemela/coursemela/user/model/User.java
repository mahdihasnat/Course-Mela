package io.coursemela.coursemela.user.model;

import io.coursemela.coursemela.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


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
    protected String passsword;
    protected String mobileNo;
    protected Date dateOfJoin;
    public User(UserEntity userEntity)
    {
        this.id = userEntity.getId();
        this.userName = userEntity.getUserName();
        this.firstName = userEntity.getFirstName();
        this.lastName = userEntity.getLastName();
        this.email = userEntity.getEmail();
        this.passsword = userEntity.getPasssword();
        this.mobileNo = userEntity.getMobileNo();
        this.dateOfJoin = userEntity.getDateOfJoin();
    }
}
