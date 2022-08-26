package io.coursemela.coursemela.user.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import io.coursemela.coursemela.user.model.Institution;
import io.coursemela.coursemela.user.model.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Slf4j
@NoArgsConstructor
@SuperBuilder(toBuilder = true)
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    protected Long id;

    @Column(nullable = false, unique = false)
    protected String userName;

    protected String firstName;


    protected String lastName;

    @Column(nullable = false, unique = false)
    protected String email;

    @JsonIgnore
    protected String password;

    //    ''' '''
    /// make mobile phone oneTomany
    protected String mobileNo;


    private Date dateOfJoin;

    @Embedded
    protected AddressEntity address;

    @ManyToMany
    private Set<InstitutionEntity> institutionEntities;

    public UserEntity(User user) {
        this.id = user.getId();
        this.userName = user.getUserName();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.mobileNo = user.getMobileNo();
        this.dateOfJoin = user.getDateOfJoin();
        try {
            this.address = new AddressEntity(user.getAddress());
        } catch (NullPointerException e) {
            log.trace(e.getStackTrace().toString());
        }
        this.institutionEntities = new HashSet<>();
        try {
            for (Institution institution : user.getInstitutions())
                this.institutionEntities.add(new InstitutionEntity(institution));
        } catch (NullPointerException e) {
            log.trace(e.getStackTrace().toString());
        }
    }

    public UserEntity(String userName, String firstName, String lastName, String email, String password, String mobileNo, Date dateOfJoin) {
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobileNo = mobileNo;
        this.dateOfJoin = dateOfJoin;
    }

}