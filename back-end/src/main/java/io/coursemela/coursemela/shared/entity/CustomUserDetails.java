package io.coursemela.coursemela.shared.entity;

import io.coursemela.coursemela.instructor.entity.Instructor;
import io.coursemela.coursemela.student.entity.Student;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {
    /// TODO this should be revisited with a good implementation
    private String userName;
    private String password;
    private boolean active;

    private List<GrantedAuthority> authorities;

    public CustomUserDetails(User user){
        this.userName = user.email;
        this.password = user.passsword;
//        this.active = tru
        if(user instanceof Instructor){
            authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_INSTRUCTOR"));

        }else if(user instanceof Student){
            authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_STUDENT"));

        }else{
            System.out.println("NEED to implement system admin ");
            System.exit(-1);
        }
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return this.userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
