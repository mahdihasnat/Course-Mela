package io.coursemela.coursemela.payment.model;

import io.coursemela.coursemela.course.model.Course;
import lombok.Data;

import java.util.List;

@Data
public class SubscriptionDTO {
    List<Course> courses;
    Promo promo;
}
