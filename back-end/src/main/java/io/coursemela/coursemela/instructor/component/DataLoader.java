package io.coursemela.coursemela.instructor.component;

import io.coursemela.coursemela.instructor.entity.Instructor;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {
    private InstructorRepository instructorRepository;

    @Autowired
    public DataLoader(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
//        loadInstructors();
    }

    @Override
    public void run(String... args)  {
        loadInstructors();
    }

    private void loadInstructors() {
        this.instructorRepository.deleteAll();
        Instructor instructor = new Instructor("John", "Doe", "vodro@gmail.com", "123", "0122", new Date(), 0, "I am new to spring boot");
        this.instructorRepository.save(instructor);
    }
}

















