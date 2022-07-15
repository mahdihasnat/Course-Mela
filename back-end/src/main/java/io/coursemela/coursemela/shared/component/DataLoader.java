package io.coursemela.coursemela.shared.component;

import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.shared.entity.Level;
import io.coursemela.coursemela.student.entity.Student;
import io.coursemela.coursemela.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {
    private InstructorRepository instructorRepository;

    private StudentRepository studentRepository;

    @Autowired
    public DataLoader(InstructorRepository instructorRepository, StudentRepository studentRepository) {
        this.instructorRepository = instructorRepository;
        this.studentRepository = studentRepository;
//        loadInstructors();
    }

    @Override
    public void run(String... args)  {
        loadData();
    }

    private void loadData() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        this.instructorRepository.deleteAll();
        if(this.instructorRepository.findAll().isEmpty()) {
            InstructorEntity instructorEntity = new InstructorEntity("jhon", "John", "Doe", "vodro@gmail.com", encoder.encode("123"), "0122", new Date(), 0, "I am new to spring boot");
            this.instructorRepository.save(instructorEntity);
        }

//        this.studentRepository.deleteAll();
        if(this.studentRepository.findAll().isEmpty()) {
            Student student = new Student("amir", "Amir", "ali", "amir@gmail.com", encoder.encode("123"), "0175655552", new Date(), Level.ELEVEN);
            this.studentRepository.save(student);
        }
    }
}

















