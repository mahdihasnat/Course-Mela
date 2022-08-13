package io.coursemela.coursemela.payment.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentEntity extends TransactionEntity {

    @ManyToOne
    private PromoEntity promoEntity;

    @OneToMany(mappedBy = "paymentEntity")
    Set<SubscriptionEntity> subscriptionEntities;

}
