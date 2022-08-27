package io.coursemela.coursemela.plan.service;

import io.coursemela.coursemela.course.entity.CourseEntity;
import io.coursemela.coursemela.course.model.Course;
import io.coursemela.coursemela.course.repository.CourseRepository;
import io.coursemela.coursemela.course.service.CourseService;
import io.coursemela.coursemela.plan.entity.PlanCourseEntity;
import io.coursemela.coursemela.plan.entity.PlanCourseKey;
import io.coursemela.coursemela.plan.entity.PlanEntity;
import io.coursemela.coursemela.plan.model.Plan;
import io.coursemela.coursemela.plan.repository.PlanCourseRepository;
import io.coursemela.coursemela.plan.repository.PlanRepository;
import io.coursemela.coursemela.student.entity.StudentEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PlanServiceImpl implements PlanService {
    @Autowired
    PlanRepository planRepository;

    @Autowired
    CourseService courseService;

    @Autowired
    PlanCourseRepository planCourseRepository;

    @Autowired
    CourseRepository courseRepository;

    @Override
    public Plan createPlan(Plan plan, StudentEntity studentEntity) {
        PlanEntity planEntity = PlanEntity.builder()
                .title(plan.getTitle())
                .startTime(plan.getStartTime())
                .endTime(plan.getEndTime())
                .studentEntity(studentEntity)
                .planCourseEntities(new HashSet<>())
                .build();

        if (plan.getCourses() != null) {
            for (Course course : plan.getCourses()) {
                CourseEntity courseEntity = courseRepository.findById(course.getId()).get();
                PlanCourseEntity planCourseEntity = PlanCourseEntity.builder()
                        .planEntity(planEntity)
                        .courseEntity(courseEntity)
                        .id(
                                PlanCourseKey.builder()
                                        .planId(planEntity.getId())
                                        .courseId(courseEntity.getId())
                                        .build()
                        )
                        .build();
                planEntity.getPlanCourseEntities().add(planCourseEntity);
            }
        }
        planEntity = planRepository.save(planEntity);
//        planEntity = planRepository.findById(planEntity.getId()).get();
        return getPlanFromPlanEntity(planEntity);
    }

    @Override
    public List<Plan> getMyPlans(Long studentId) {
        List<PlanEntity> planEntities = planRepository.findAllByStudentEntityId(studentId);
        return planEntities.stream().map(
                planEntity -> getPlanFromPlanEntity(planEntity)
        ).collect(Collectors.toList());
    }


    Plan getPlanFromPlanEntity(PlanEntity planEntity) {

        Plan plan = Plan.builder()
                .id(planEntity.getId())
                .title(planEntity.getTitle())
                .startTime(planEntity.getStartTime())
                .endTime(planEntity.getEndTime())
                .courses(new ArrayList<>())
                .build();
        for (PlanCourseEntity planCourseEntity : planEntity.getPlanCourseEntities()) {
            plan.getCourses().add(
                    courseService.getCourseFromCourseEntity(
                            planCourseEntity.getCourseEntity()
                    )
            );
        }
        return plan;

    }
}
