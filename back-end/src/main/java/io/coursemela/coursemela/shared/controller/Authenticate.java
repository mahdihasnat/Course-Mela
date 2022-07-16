package io.coursemela.coursemela.shared.controller;

import io.coursemela.coursemela.shared.entity.AuthenticateRequest;
import io.coursemela.coursemela.shared.entity.AuthenticateResponse;
import io.coursemela.coursemela.user.entity.UserEntity;
import io.coursemela.coursemela.user.model.User;
import io.coursemela.coursemela.user.service.CustomUserDetailsService;
import io.coursemela.coursemela.shared.util.JwtUtils;
import io.coursemela.coursemela.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/authenticate")
public class Authenticate {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/hello")
    public String  hello(@RequestParam("name") String name ){
        return "hello " + name;
    }

    @GetMapping("/test")
    public String test(){
        return "Succedd";
    }

    @PostMapping("/")
    public ResponseEntity<?> createAuthenticationToken(
            @RequestBody AuthenticateRequest authenticateRequest
            ) throws Exception{
        try {
//            System.out.println(authenticateRequest);
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticateRequest.getUserName(), authenticateRequest.getPassword()
                    )
            );

        }catch (BadCredentialsException e){
            throw new Exception("incorrect username or password", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(
                authenticateRequest.getUserName()
        );
        final String jwt = jwtUtils.generateToken(userDetails);
//        System.out.println(jwt);
        return ResponseEntity.ok(new AuthenticateResponse(jwt));
    }

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    User createUser(@RequestBody User user){
        return userService.createUser(user);
    }


    // sample:   /register?userName=jhon
    @GetMapping("/register")
    Boolean isAvailableUser(@RequestParam String userName)
    {
        return userService.isAvailableUser(userName);
    }

}
