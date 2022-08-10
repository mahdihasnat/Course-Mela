package io.coursemela.coursemela.user.model;

import io.coursemela.coursemela.user.entity.InstitutionEntity;
import io.coursemela.coursemela.user.entity.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
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

    public User(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.userName = userEntity.getUserName();
        this.firstName = userEntity.getFirstName();
        this.lastName = userEntity.getLastName();
        this.email = userEntity.getEmail();
        this.password = userEntity.getPasssword();
        this.mobileNo = userEntity.getMobileNo();
        this.dateOfJoin = userEntity.getDateOfJoin();
        try {
            this.address = new Address(userEntity.getAddress());
        } catch (NullPointerException e) {
            log.trace(e.getStackTrace().toString());
        }

        this.institutions = new HashSet<>();
        try {
            for (InstitutionEntity institutionEntity : userEntity.getInstitutionEntities())
                institutions.add(new Institution(institutionEntity));
        } catch (NullPointerException e) {
            log.trace(e.getStackTrace().toString());
        }
    }


    public void encodePassword() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(this.password);
    }

}
