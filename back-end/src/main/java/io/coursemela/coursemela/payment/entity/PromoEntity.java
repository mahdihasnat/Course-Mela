package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.payment.enumeration.PromoType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromoEntity {
    @Id
    private Long id;
    private PromoType promoType;
    private Long value;
    private Long minimumPrice;
    private Long maximumDiscount;
}
