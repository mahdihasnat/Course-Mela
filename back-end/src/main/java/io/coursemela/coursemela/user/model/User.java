package io.coursemela.coursemela.user.model;

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
}
