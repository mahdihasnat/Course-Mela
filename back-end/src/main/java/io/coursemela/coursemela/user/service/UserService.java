package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.user.model.User;

public interface UserService {
    User createUser(User user);

    Boolean isAvailableUser(String userName);

    String getUserName() throws Exception;

    Long getUserId() throws Exception;

    boolean isInstructor(Long userId);
}
