package io.coursemela.coursemela.shared.entity;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.user.entity.UserEntity;
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

    private List<GrantedAuthority> authorities;

    public CustomUserDetails(UserEntity userEntity){
        this.userName = userEntity.getUserName();
        this.password = userEntity.getPasssword();
//        this.active = tru
        if(userEntity instanceof InstructorEntity){
            authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_INSTRUCTOR"));

        }else if(userEntity instanceof StudentEntity){
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
