package io.coursemela.coursemela.payment.entity;

import io.coursemela.coursemela.payment.enumeration.TRANSACTION_MEDIUM;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;


@Entity
@Data
public class TransactionEntity {
    @Id
    private Long id;
    private Long amount;
    private ZonedDateTime timestamp;

    private TRANSACTION_MEDIUM transactionMedium;
    private String bankInfo;
    private String accountInfo;
    private String merchantTransactionId;

}
