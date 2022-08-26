package io.coursemela.coursemela.student.model;

import io.coursemela.coursemela.student.entity.Level;
import io.coursemela.coursemela.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
public class Student extends User {
    Level level;
}
