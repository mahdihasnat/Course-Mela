package io.coursemela.coursemela.shared.controller;

import io.coursemela.coursemela.instructor.model.Instructor;
import io.coursemela.coursemela.instructor.service.InstructorService;
import io.coursemela.coursemela.shared.entity.AuthenticateRequest;
import io.coursemela.coursemela.shared.entity.AuthenticateResponse;
import io.coursemela.coursemela.student.entity.Level;
import io.coursemela.coursemela.student.model.Student;
import io.coursemela.coursemela.student.service.StudentService;
import io.coursemela.coursemela.user.model.User;
import io.coursemela.coursemela.user.service.CustomUserDetailsService;
import io.coursemela.coursemela.shared.util.JwtUtils;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.user.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Date;


@Data
class RegisterForm
{
    private  String userName;
    private String firstName;
    protected String lastName;
    protected String email;
    protected String passsword;
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

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    User createUser(@RequestBody RegisterForm form){

        if(form.getRole() == "instructor")
        {

            Instructor instructor = new Instructor();
            instructor.setUserName(form.getUserName());
            instructor.setFirstName(form.getFirstName());
            instructor.setLastName(form.getLastName());
            instructor.setEmail(form.getEmail());
            instructor.setPasssword(form.getPasssword());
            instructor.setMobileNo(form.getMobileNo());
            instructor.setDateOfJoin(new Date());
            instructor.setCredit(0);
            instructor.setBio(form.getBio());

            return instructorService.createInstructor(instructor);
        }
        else if(form.getRole() == "student")
        {
            Student student = new Student();
            student.setUserName(form.getUserName());
            student.setFirstName(form.getFirstName());
            student.setLastName(form.getLastName());
            student.setEmail(form.getEmail());
            student.setPasssword(form.getPasssword());
            student.setMobileNo(form.getMobileNo());
            student.setDateOfJoin(new Date());
            student.setLevel(Level.getLebel(form.getLevel()));
            return  studentService.createStudent(student);
        }
        else return null;
    }


    // sample:   /register?userName=jhon
    @GetMapping("/register")
    Boolean isAvailableUser(@RequestParam String userName)
    {
        return userService.isAvailableUser(userName);
    }

}
