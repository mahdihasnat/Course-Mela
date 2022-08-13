package io.coursemela.coursemela.payment.model;

import io.coursemela.coursemela.payment.enumeration.PromoType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Promo {
    private Long id;
    private String code;
    private PromoType promoType;
    private Long value;
    private Long minimumPrice;
    private Long maximumDiscount;
    private Long maximumAttempt;
}
