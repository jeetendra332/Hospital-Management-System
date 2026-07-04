package com.hospital.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AppointmentDTO {

    private Long appointmentId;
    private LocalDateTime appointmentDate;
    private String status;

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;
}