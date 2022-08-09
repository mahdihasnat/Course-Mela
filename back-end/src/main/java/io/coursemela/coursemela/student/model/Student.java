package io.coursemela.coursemela.student.model;

import io.coursemela.coursemela.student.entity.Level;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.user.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student extends User {
    Level level;

    public Student(StudentEntity studentEntity) {
        super(studentEntity);
        this.setLevel(studentEntity.getLevel());
    }

}
