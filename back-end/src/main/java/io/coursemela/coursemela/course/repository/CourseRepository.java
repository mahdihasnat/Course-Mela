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
            "from SubscriptionEntity subE left join CoursePricingEntity cpE left join CourseEntity cE " +
            "where subE.studentEntity.id = ?1 " +
            "and ?2 between subE.startTime and subE.endTime " +
            "and cpE.id = subE.coursePricingEntity.id " +
            "and cpE.courseEntity.id = cE.id ")
    List<CourseEntity> getAllSubscribedCourses(Long studentId, ZonedDateTime currentTime);

}
