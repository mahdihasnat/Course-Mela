package io.coursemela.coursemela.shared.controller;

import io.coursemela.coursemela.course.model.Subject;
import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.instructor.service.InstructorService;
import io.coursemela.coursemela.shared.entity.AuthenticateRequest;
import io.coursemela.coursemela.shared.entity.AuthenticateResponse;
import io.coursemela.coursemela.shared.util.JwtUtils;
import io.coursemela.coursemela.student.entity.Level;
import io.coursemela.coursemela.student.model.Student;
import io.coursemela.coursemela.student.service.StudentService;
import io.coursemela.coursemela.user.model.User;
import io.coursemela.coursemela.user.service.CustomUserDetailsService;
import io.coursemela.coursemela.user.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Date;


@Data
class RegisterForm {
    private String userName;
    private String firstName;
    protected String lastName;
    protected String email;
    protected String password;
    protected String mobileNo;
    protected Date dateOfJoin;
    protected String role;
    private String bio;
    private String level;
}

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
    public String hello(@RequestParam("name") String name, @RequestParam("id") int id,
                        @RequestParam(name = "role", required = false) String role) {
        return "hello " + name + " " + id + " " + role;
    }

    @PostMapping("/test")
    public String helloPost(@RequestParam("name") String name, @RequestParam("id") int id,
                            @RequestParam(name = "role", required = false) String role,
                            Subject sub) {
        return "hello " + name + " " + id + " " + role + " " + sub;
    }


    @GetMapping("/test")
    public String test() {
        return "Succedd";
    }

    @PostMapping("/")
    public ResponseEntity<?> createAuthenticationToken(
            @RequestBody AuthenticateRequest authenticateRequest
    ) throws Exception {
        try {
//            System.out.println(authenticateRequest);
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticateRequest.getUserName(), authenticateRequest.getPassword()
                    )
            );

        } catch (BadCredentialsException e) {
            throw new Exception("incorrect username or password", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(
                authenticateRequest.getUserName()
        );
        final String jwt = jwtUtils.generateToken(userDetails);
//         System.out.println(userDetails.getAuthorities());
//         final String role = userDetails.getAuthorities().iterator().next().toString().substring(5).toLowerCase();
// //        System.out.println(jwt);
//         System.out.println(role);
        return ResponseEntity.ok(new AuthenticateResponse(jwt));
    }


    @PostMapping("/role")
    public Collection<? extends GrantedAuthority> getRole() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken)
            return null;
        authentication.getAuthorities().forEach(System.out::println);
        // [ROLE_STUDENT]
        return authentication.getAuthorities(); //.iterator().next().toString().substring(5).toLowerCase();
    }

    @Autowired
    private UserService userService;

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    User createUser(@RequestBody RegisterForm form) {
        System.out.println(form.toString());
        if (form.getRole().equalsIgnoreCase("instructor")) {

            Instructor instructor = new Instructor();
            instructor.setUserName(form.getUserName());
            instructor.setFirstName(form.getFirstName());
            instructor.setLastName(form.getLastName());
            instructor.setEmail(form.getEmail());
            instructor.setPassword(form.getPassword());
            instructor.setMobileNo(form.getMobileNo());
            instructor.setDateOfJoin(new Date());
            instructor.setCredit(0);
            instructor.setBio(form.getBio());

            instructor.encodePassword();
            return instructorService.createInstructor(instructor);
        } else if (form.getRole().equalsIgnoreCase("student")) {
            Student student = new Student();
            student.setUserName(form.getUserName());
            student.setFirstName(form.getFirstName());
            student.setLastName(form.getLastName());
            student.setEmail(form.getEmail());
            student.setPassword(form.getPassword());
            student.setMobileNo(form.getMobileNo());
            student.setDateOfJoin(new Date());
//            student.setLevel(Level.getLebel(form.getLevel()));
            student.setLevel(Level.ELEVEN);

            student.encodePassword();
            return studentService.createStudent(student);
        } else return null;
    }


    // sample:   /register?userName=jhon
    @GetMapping("/register")
    Boolean isAvailableUser(@RequestParam String userName) {
        return userService.isAvailableUser(userName);
    }

}
