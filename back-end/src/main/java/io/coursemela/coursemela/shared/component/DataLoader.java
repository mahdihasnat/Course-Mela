package io.coursemela.coursemela.shared.component;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.course.repository.SubjectRepository;
import io.coursemela.coursemela.course.repository.TopicRepository;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.student.entity.Level;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class DataLoader implements CommandLineRunner {

    private final InstructorRepository instructorRepository;

    private final StudentRepository studentRepository;


    private final SubjectRepository subjectRepository;

    private final TopicRepository topicRepository;


//    private TopicRepository

//    @Autowired
//    public DataLoader(InstructorRepository instructorRepository, StudentRepository studentRepository) {
//        this.instructorRepository = instructorRepository;
//        this.studentRepository = studentRepository;
////        loadInstructors();
//    }

    public DataLoader(InstructorRepository instructorRepository, StudentRepository studentRepository, SubjectRepository subjectRepository, TopicRepository topicRepository) {
        this.instructorRepository = instructorRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    public void run(String... args) {
        loadData();
    }

    private void loadData() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
//        this.instructorRepository.deleteAll();
        if (this.instructorRepository.findAll().isEmpty()) {
            InstructorEntity instructorEntity = new InstructorEntity("jhon", "John", "Doe", "vodro@gmail.com", encoder.encode("123"), "0122", new Date(), 0, "I am new to spring boot");
            this.instructorRepository.save(instructorEntity);
        }

//        this.studentRepository.deleteAll();
        if (this.studentRepository.findAll().isEmpty()) {
            StudentEntity studentEntity = new StudentEntity("amir", "Amir", "ali", "amir@gmail.com", encoder.encode("123"), "0175655552", new Date(), Level.ELEVEN);
            this.studentRepository.save(studentEntity);
        }

        if (this.subjectRepository.findAll().isEmpty()) {
//            Subject su = new Subject()
//            System.out.println("new subject created");

            SubjectEntity phy = new SubjectEntity(Long.valueOf(2), "Physics");
            phy = this.subjectRepository.save(phy);

            SubjectEntity math = new SubjectEntity(Long.valueOf(1), "Math");
            math = this.subjectRepository.save(math);

            TopicEntity phy_vector = new TopicEntity(Long.valueOf(1), phy, "Vector");
            this.topicRepository.save(phy_vector);
            TopicEntity phy_thermo = new TopicEntity(Long.valueOf(2), phy, "Thermo");
            this.topicRepository.save(phy_thermo);

            TopicEntity math_algebra = new TopicEntity(Long.valueOf(4), math, "Algebra");
            this.topicRepository.save(math_algebra);

            TopicEntity math_geometry = new TopicEntity(Long.valueOf(5), math, "Geometry");
            this.topicRepository.save(math_geometry);

        }

    }
}

















