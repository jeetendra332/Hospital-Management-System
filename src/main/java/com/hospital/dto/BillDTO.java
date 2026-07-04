package com.hospital.dto;

import lombok.Data;

@Data
public class BillDTO {

    private Long billId;

    private Double amount;

    private String paymentStatus;

    private Long patientId;

    private String patientName;
}