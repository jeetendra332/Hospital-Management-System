package com.hospital.service;

import com.hospital.dto.AppointmentRequest;
import com.hospital.entity.Appointment;
import jakarta.validation.Valid;

import java.util.List;

public interface AppointmentService {

    Appointment saveAppointment(AppointmentRequest request);

    List<Appointment> getAllAppointments();

    Appointment getAppointment(Long id);

    void deleteAppointment(Long id);

    Appointment updateAppointment(Long id, @Valid AppointmentRequest request);
}