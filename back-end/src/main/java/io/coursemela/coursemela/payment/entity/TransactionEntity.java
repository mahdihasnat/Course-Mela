package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.payment.enumeration.TransactionMedium;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.time.ZonedDateTime;


@MappedSuperclass
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class TransactionEntity {
    @Id
    @GeneratedValue
    private Long id;
    private Long amount;
    private ZonedDateTime timestamp;

    private TransactionMedium transactionMedium;
    private String bankInfo;
    private String accountInfo;
    private String merchantTransactionId;

}
