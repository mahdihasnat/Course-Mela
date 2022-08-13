package io.coursemela.coursemela.user.service;

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
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        UserEntity userEntity = new UserEntity(user);
        userEntity = userRepository.save(userEntity);
        user = new User(userEntity);
        return user;
    }

    public Boolean isAvailableUser(String userName) {
        return !(userRepository.findByUserName(userName).isPresent());
    }

    public String getUserName() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken)
            throw new Exception("Not Logged In");
        return authentication.getName();
    }

    public Long getUserId() throws Exception {
        String userName = getUserName();
        Optional<UserEntity> optionalUserEntity = userRepository.findByUserName(userName);
        if (!optionalUserEntity.isPresent())
            throw new Exception("UserName not present");
        return optionalUserEntity.get().getId();
    }

}
