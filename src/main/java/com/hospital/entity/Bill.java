package com.hospital.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;

    private Double amount;

    private String paymentStatus;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
}