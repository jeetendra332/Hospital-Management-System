package com.hospital.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private long totalDoctors;
    private long totalPatients;
    private long totalAppointments;

}