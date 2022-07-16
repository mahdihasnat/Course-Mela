package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.user.entity.UserEntity;
import io.coursemela.coursemela.user.model.User;
import io.coursemela.coursemela.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.stereotype.Service;

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
}
