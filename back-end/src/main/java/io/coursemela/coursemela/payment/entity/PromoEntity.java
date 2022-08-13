package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.payment.enumeration.PromoType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromoEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String code;
    private PromoType promoType;
    private Long value;
    private Long minimumPrice;
    private Long maximumDiscount;
    private Long maximumAttempt;

    @OneToMany(mappedBy = "promoEntity")
    Set<StudentPromoEntity> studentPromoEntities;
}
