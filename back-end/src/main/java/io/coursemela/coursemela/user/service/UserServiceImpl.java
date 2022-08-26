package io.coursemela.coursemela.user.service;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.user.entity.InstitutionEntity;
import io.coursemela.coursemela.user.entity.UserEntity;
import io.coursemela.coursemela.user.model.Institution;
import io.coursemela.coursemela.user.model.User;
import io.coursemela.coursemela.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;

@Service
@Slf4j
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

    @Autowired
    AddressService addressService;

    @Override
    public User getUserFromUserEntity(UserEntity userEntity) {
        User user = User.builder()
                .id(userEntity.getId())
                .userName(userEntity.getUserName())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .mobileNo(userEntity.getMobileNo())
                .dateOfJoin(userEntity.getDateOfJoin())
                .address(addressService.getAddressFromAddressEntity(
                                userEntity.getAddress()
                        )
                )
                .institutions(new HashSet<>())
                .build();
        try {
            for (InstitutionEntity institutionEntity : userEntity.getInstitutionEntities())
                user.getInstitutions().add(new Institution(institutionEntity));
        } catch (NullPointerException e) {
            log.trace(e.getStackTrace().toString());
        }
        return user;
    }
}
