package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.shared.entity.CustomUserDetails;
import io.coursemela.coursemela.user.entity.UserEntity;
//import io.coursemela.coursemela.shared.repository.UserRepository;
import io.coursemela.coursemela.student.repository.StudentRepository;
import io.coursemela.coursemela.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
       /// TODO WHEN student has and teacher has same username
        Optional<UserEntity> user = userRepository.findByUserName(userName);
        user.orElseThrow(() -> new UsernameNotFoundException("not found" + userName));

        return  user.map(CustomUserDetails::new).get();

        //TODO  do same for admin. Need a elegant solution

    }
}
