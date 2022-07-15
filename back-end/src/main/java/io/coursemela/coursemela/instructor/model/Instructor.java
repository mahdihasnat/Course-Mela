package io.coursemela.coursemela.instructor.model;

import io.coursemela.coursemela.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Instructor extends User {
    private double credit;
    private String bio;
}
