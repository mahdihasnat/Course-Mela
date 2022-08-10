package io.coursemela.coursemela.payment.model;

import io.coursemela.coursemela.payment.enumeration.TRANSACTION_MEDIUM;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.io.Serializable;
import java.time.ZonedDateTime;

@AllArgsConstructor
@Getter
@Data
public class Transaction implements Serializable {
    private final Long id;
    private final Long amount;
    private final ZonedDateTime timestamp;
    private final TRANSACTION_MEDIUM transactionMedium;
    private final String bankInfo;
    private final String accountInfo;
    private final String merchantTransactionId;
}
