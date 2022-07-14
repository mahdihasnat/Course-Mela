package io.coursemela.coursemela.shared.controller;

import io.coursemela.coursemela.shared.entity.AuthenticateRequest;
import io.coursemela.coursemela.shared.entity.AuthenticateResponse;
import io.coursemela.coursemela.shared.service.CustomUserDetailsService;
import io.coursemela.coursemela.shared.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
public class Authenticate {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(
            @RequestBody AuthenticateRequest authenticateRequest
            ) throws Exception{
        try {
            System.out.println(authenticateRequest);
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
        System.out.println(jwt);
        return ResponseEntity.ok(new AuthenticateResponse(jwt));
    }

}
