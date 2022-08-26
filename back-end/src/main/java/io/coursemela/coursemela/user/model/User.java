package io.coursemela.coursemela.user.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class User {
    protected Long id;
    protected String userName;
    protected String firstName;
    protected String lastName;
    protected String email;
    protected String password;
    protected String mobileNo;
    protected Date dateOfJoin;
    protected Address address;

    Set<Institution> institutions;

    public void encodePassword() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(this.password);
    }

}
