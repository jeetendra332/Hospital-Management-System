package com.hospital.controller;

import com.hospital.dto.AppointmentRequest;
import com.hospital.entity.Appointment;
import com.hospital.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Appointment> addAppointment(
            @Valid @RequestBody AppointmentRequest request) {

        Appointment appointment = service.saveAppointment(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(appointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequest request) {

        return ResponseEntity.ok(
                service.updateAppointment(id, request));
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments() {

        return ResponseEntity.ok(service.getAllAppointments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointment(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getAppointment(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(
            @PathVariable Long id) {

        service.deleteAppointment(id);

        return ResponseEntity.ok("Appointment deleted successfully.");
    }
}