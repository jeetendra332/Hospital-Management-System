package com.hospital.dto;

import lombok.Data;

@Data
public class PrescriptionDTO {

    private Long prescriptionId;

    private String medicines;

    private String notes;

    private Long doctorId;

    private String doctorName;

    private Long patientId;

    private String patientName;
}

