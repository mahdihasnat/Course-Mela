package io.coursemela.coursemela.shared.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter@Setter
@MappedSuperclass
public abstract class User{
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
    // use of address


    private Date dateOfJoin;

    public User(){}

    public User(String userName, String firstName, String lastName, String email, String passsword, String mobileNo, Date dateOfJoin) {
//        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passsword = passsword;
        this.mobileNo = mobileNo;
        this.dateOfJoin = dateOfJoin;
    }


}