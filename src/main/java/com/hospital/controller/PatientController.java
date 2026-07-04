package com.hospital.controller;

import com.hospital.dto.PatientRequest;
import com.hospital.entity.Patient;
import com.hospital.service.PatientService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService service;

    public PatientController(PatientService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Patient> addPatient(
            @Valid @RequestBody PatientRequest request) {

        Patient patient = service.savePatient(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(patient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequest request) {

        return ResponseEntity.ok(
                service.updatePatient(id, request));
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getPatients() {

        return ResponseEntity.ok(service.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatient(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getPatientById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(
            @PathVariable Long id) {

        service.deletePatient(id);

        return ResponseEntity.ok("Patient deleted successfully.");
    }
}