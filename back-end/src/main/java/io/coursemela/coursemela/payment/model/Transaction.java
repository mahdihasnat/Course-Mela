package io.coursemela.coursemela.payment.model;

import io.coursemela.coursemela.payment.enumeration.TransactionMedium;
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
    private final TransactionMedium transactionMedium;
    private final String bankInfo;
    private final String accountInfo;
    private final String merchantTransactionId;
}
