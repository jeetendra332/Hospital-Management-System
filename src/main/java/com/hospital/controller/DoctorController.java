package com.hospital.controller;

import com.hospital.dto.DoctorRequest;
import com.hospital.entity.Doctor;
import com.hospital.service.DoctorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService service;

    public DoctorController(DoctorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Doctor> addDoctor(
            @Valid @RequestBody DoctorRequest request) {

        Doctor doctor = service.saveDoctor(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(doctor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorRequest request) {

        Doctor doctor = service.updateDoctor(id, request);

        return ResponseEntity.ok(doctor);
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getDoctors() {

        return ResponseEntity.ok(service.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getDoctorById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(
            @PathVariable Long id) {

        service.deleteDoctor(id);

        return ResponseEntity.ok("Doctor deleted successfully.");
    }
}