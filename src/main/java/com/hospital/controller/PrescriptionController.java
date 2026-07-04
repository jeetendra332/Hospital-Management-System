package com.hospital.controller;

import com.hospital.dto.PrescriptionRequest;
import com.hospital.entity.Prescription;
import com.hospital.service.PrescriptionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescriptions")
public class PrescriptionController {

    private final PrescriptionService service;

    public PrescriptionController(PrescriptionService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Prescription> addPrescription(
            @Valid @RequestBody PrescriptionRequest request) {

        Prescription prescription = service.savePrescription(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(prescription);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prescription> updatePrescription(
            @PathVariable Long id,
            @Valid @RequestBody PrescriptionRequest request) {

        return ResponseEntity.ok(
                service.updatePrescription(id, request));
    }

    @GetMapping
    public ResponseEntity<List<Prescription>> getPrescriptions() {

        return ResponseEntity.ok(service.getAllPrescriptions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prescription> getPrescription(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getPrescriptionById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrescription(
            @PathVariable Long id) {

        service.deletePrescription(id);

        return ResponseEntity.ok("Prescription deleted successfully.");
    }
}