package io.coursemela.coursemela.shared.component;

import io.coursemela.coursemela.course.entity.SubjectEntity;
import io.coursemela.coursemela.course.entity.TopicEntity;
import io.coursemela.coursemela.course.model.Tag;
import io.coursemela.coursemela.course.repository.SubjectRepository;
import io.coursemela.coursemela.course.repository.TopicRepository;
import io.coursemela.coursemela.course.service.TagService;
import io.coursemela.coursemela.instructor.entity.InstructorEntity;
import io.coursemela.coursemela.instructor.repository.InstructorRepository;
import io.coursemela.coursemela.payment.enumeration.PromoType;
import io.coursemela.coursemela.payment.model.Promo;
import io.coursemela.coursemela.payment.service.PromoService;
import io.coursemela.coursemela.student.entity.Level;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.repository.StudentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Slf4j
public class DataLoader implements CommandLineRunner {

    @Autowired
    private InstructorRepository instructorRepository;

    @Autowired
    private StudentRepository studentRepository;


    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private TagService tagService;

    @Autowired
    private PromoService promoService;

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
        try {
            tagService.createTag(new Tag(0L, "Simple"));
            tagService.createTag(new Tag(0L, "Gorgeus"));

        } catch (Exception e) {
            ;
        }

        try {
            promoService.createPromo(
                    Promo.builder()
                            .code("WLCM")
                            .maximumDiscount(100L)
                            .maximumAttempt(5L)
                            .promoType(PromoType.FIXED)
                            .value(10L)
                            .minimumPrice(100L)
                            .build()
            );
        } catch (Exception e) {
            ;
        }

    }
}

















