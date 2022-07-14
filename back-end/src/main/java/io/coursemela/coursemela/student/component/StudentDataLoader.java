package io.coursemela.coursemela.student.component;

import io.coursemela.coursemela.instructor.entity.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.shared.entity.Level;
import io.coursemela.coursemela.student.entity.Student;
import io.coursemela.coursemela.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;



@Component
public class StudentDataLoader implements CommandLineRunner {
    private StudentRepository studentRepository;

    @Autowired
    public StudentDataLoader(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
//        loadInstructors();
    }

    @Override
    public void run(String... args) {
        loadStudents();
    }

    private void loadStudents(){
        this.studentRepository.deleteAll();
        Student student = new Student("Amir", "ali", "amir@gmail.com", "123", "0175655552",  new Date(), Level.ELEVEN);
        this.studentRepository.save(student);
    }
}

















