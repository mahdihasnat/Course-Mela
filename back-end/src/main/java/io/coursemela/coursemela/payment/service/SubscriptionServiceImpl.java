package io.coursemela.coursemela.payment.service;

import io.coursemela.coursemela.course.entity.CoursePricingEntity;
import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.repository.CoursePricingRepository;
import io.coursemela.coursemela.payment.entity.PaymentEntity;
import io.coursemela.coursemela.payment.entity.PromoEntity;
import io.coursemela.coursemela.payment.entity.SubscriptionEntity;
import io.coursemela.coursemela.payment.model.SubscriptionDTO;
import io.coursemela.coursemela.payment.repository.PaymentRepository;
import io.coursemela.coursemela.payment.repository.PromoRepository;
import io.coursemela.coursemela.payment.repository.SubscriptionRepository;
import io.coursemela.coursemela.student.entity.StudentEntity;
import io.coursemela.coursemela.student.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private PromoRepository promoRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CoursePricingRepository coursePricingRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Override
    public Boolean subscribe(SubscriptionDTO subscriptionDTO, Long studentId) throws Exception {
        Optional<PromoEntity> optionalPromoEntity = promoRepository.findById(subscriptionDTO.getPromo().getId());
        if (!optionalPromoEntity.isPresent())
            throw new Exception("Promo not available");
        Optional<StudentEntity> optionalStudentEntity = studentRepository.findById(studentId);
        if (!optionalStudentEntity.isPresent())
            throw new Exception("Student no available");

        PaymentEntity paymentEntity = PaymentEntity.builder()
                .promoEntity(optionalPromoEntity.get())
                .build();
        paymentEntity = paymentRepository.save(paymentEntity);
        for (Course course : subscriptionDTO.getCourses()) {
            CoursePricingEntity coursePricingEntity = coursePricingRepository.findFirstByCourseEntityIdOrderByStartDateDesc(course.getId()).get(0);
            SubscriptionEntity subscriptionEntity = SubscriptionEntity.builder()
                    .studentEntity(optionalStudentEntity.get())
                    .paymentEntity(paymentEntity)
                    .coursePricingEntity(coursePricingEntity)
                    .startTime(ZonedDateTime.now())
                    .endTime(ZonedDateTime.now())
                    .build();
            subscriptionEntity = subscriptionRepository.save(subscriptionEntity);

        }
        return true;
    }
}
