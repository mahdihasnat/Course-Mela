package io.coursemela.coursemela.course.model;

import io.coursemela.coursemela.course.entity.CoursePricingEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CoursePricing {
    private Long id;
    private Long subsFee; // actual subscription fee  = subsFee *(1 - offPercent/100)
    private Long insFee; // actual fee get by instructor
    private Double offPercent;

    public CoursePricing(CoursePricingEntity coursePricingEntity)
    {
        this.id = coursePricingEntity.getId();
        this.subsFee = coursePricingEntity.getSubsFee();
        this.insFee = coursePricingEntity.getInsFee();
        this.offPercent = coursePricingEntity.getOffPercent();
    }

}
