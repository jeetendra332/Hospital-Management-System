package com.hospital.dto;

import lombok.Data;

@Data
public class DoctorDTO {

    private Long doctorId;

    private String doctorName;

    private String specialization;

    private String department;

    private Integer experience;
}