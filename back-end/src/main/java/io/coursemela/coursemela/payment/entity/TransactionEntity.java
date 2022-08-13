package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.payment.enumeration.TransactionMedium;
import lombok.Data;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.time.ZonedDateTime;


@Data
@MappedSuperclass
public abstract class TransactionEntity {
    @Id
    private Long id;
    private Long amount;
    private ZonedDateTime timestamp;

    private TransactionMedium transactionMedium;
    private String bankInfo;
    private String accountInfo;
    private String merchantTransactionId;

}
