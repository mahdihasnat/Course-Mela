package io.coursemela.coursemela.course.model;

import lombok.Data;

import java.util.Date;

@Data
public class CoursePricing {
    private Long id;
    private Date startDate;
    private Long subsFee; // actual subscription fee paid by user
    private Long insFee; // actual fee get by instructor
    private Double offPercent;
}
