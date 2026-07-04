package com.hospital.dto;

import lombok.Data;

@Data
public class PatientDTO {

    private Long patientId;

    private String patientName;

    private Integer age;

    private String gender;

    private String phone;
}