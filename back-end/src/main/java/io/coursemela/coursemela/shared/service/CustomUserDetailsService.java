package io.coursemela.coursemela.shared.service;

import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.shared.entity.CustomUserDetails;
import io.coursemela.coursemela.shared.entity.User;
//import io.coursemela.coursemela.shared.repository.UserRepository;
import io.coursemela.coursemela.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
//    @Autowired
//    UserRepository userRepository;

    @Autowired
    InstructorRepository instructorRepository;

    @Autowired
    StudentRepository studentRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
       /// TODO WHEN student has and teacher has same username
        Optional<User> user = studentRepository.findByUserName(userName);
        if(user.isEmpty()){
            user = instructorRepository.findByUserName(userName);
        }
        user.orElseThrow(() -> new UsernameNotFoundException("not found" + userName));

        return  user.map(CustomUserDetails::new).get();

        //TODO  do same for admin. Need a elegant solution

    }
}
