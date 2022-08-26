package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.user.entity.UserEntity;
import io.coursemela.coursemela.user.model.User;
import io.coursemela.coursemela.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        UserEntity userEntity = new UserEntity(user);
        userEntity = userRepository.save(userEntity);
        user = getUserFromUserEntity(userEntity);
        return user;
    }

    @Override
    public Boolean isAvailableUser(String userName) {
        return !(userRepository.findByUserName(userName).isPresent());
    }

    @Override
    public String getUserName() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken)
            throw new Exception("Not Logged In");
        return authentication.getName();
    }

    @Override
    public Long getUserId() throws Exception {
        String userName = getUserName();
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserName(userName);
        if (!optionalUserEntity.isPresent())
            throw new Exception("UserName not present");
        return optionalUserEntity.get().getId();
    }

    @Autowired
    InstructorRepository instructorRepository;

    @Override
    public boolean isInstructor(Long userId) {
        Optional<InstructorEntity> optionalInstructorEntity = instructorRepository.findById(userId);
        return optionalInstructorEntity.isPresent();
    }

    public User getUserFromUserEntity(UserEntity userEntity) {
        return new User(userEntity);
    }
}
