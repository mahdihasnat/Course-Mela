package io.coursemela.coursemela.course.repository;

import io.coursemela.coursemela.course.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {
    List<CourseEntity> findCourseEntitiesByCourseTagEntitiesTagEntityId(Long tagId);

    List<CourseEntity> findAllByInstructorEntityUserName(String userName);


//    subscription table has student id and course pricing id  as foreign key
//  CoursePricing has course id as foreign key
//    given student id, find all course that student subscribed to

    @Query(value = "select distinct cE " +
            "from SubscriptionEntity subE inner join CoursePricingEntity cpE " +
            "on cpE.id = subE.coursePricingEntity.id " +
            "inner join CourseEntity cE on cpE.courseEntity.id = cE.id  " +
            "where subE.studentEntity.id = ?1 " +
            "and ?2 between subE.startTime and subE.endTime ")
    List<CourseEntity> getAllSubscribedCourses(Long studentId, ZonedDateTime currentTime);


    @Query(value = "select sum(cpE.insFee) " +
            "from SubscriptionEntity subE inner join CoursePricingEntity cpE " +
            "on cpE.id = subE.coursePricingEntity.id " +
            "inner join CourseEntity cE on cpE.courseEntity.id = cE.id " +
            "where cE.instructorEntity.id = ?1 " +
            "and subE.startTime >= ?2" +
            "")
    Long totalEarnOfInstructor(Long instructorId, ZonedDateTime startingTime);

    @Query(value = "select sum(cpE.insFee) " +
            "from SubscriptionEntity subE inner join CoursePricingEntity cpE " +
            "on cpE.id = subE.coursePricingEntity.id " +
            "inner join CourseEntity cE on cpE.courseEntity.id = cE.id " +
            "where cE.id = ?1 " +
            "and subE.startTime >= ?2"
    )
    Long totalEarnOfCourse(Long courseId, ZonedDateTime startingTime);

    List<CourseEntity> findAllByTopicEntityId(Long topicId);

    @Query(value = "select count(subE.id) " +
            "from SubscriptionEntity subE inner join CoursePricingEntity cpE " +
            "on subE.coursePricingEntity.id = cpE.id " +
            "inner join CourseEntity cE " +
            "on cpE.courseEntity.id = cE.id  " +
            "where cE.id = ?1 and subE.studentEntity.id = ?2 " +
            "and subE.startTime <= ?3 " +
            "and ?3 <= subE.endTime ")
    Integer isEnrolled(Long courseId, Long studentId, ZonedDateTime now);

    @Query(value = "select sum(vE.duration) " +
            "from VideoEntity vE " +
            "where vE.courseEntity.id = ?1")
    Double getTotalVideoDurationOfCourse(Long courseId);

    @Query(value = "select count(vE.id) " +
            "from VideoEntity vE " +
            "where vE.courseEntity.id = ?1 ")
    Integer getTotalVideoCountOfCourse(Long courseId);
}
