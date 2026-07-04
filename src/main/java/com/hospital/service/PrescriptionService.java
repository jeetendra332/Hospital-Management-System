package com.hospital.service;

import com.hospital.dto.PrescriptionRequest;
import com.hospital.entity.Prescription;
import jakarta.validation.Valid;

import java.util.List;

public interface PrescriptionService {

    Prescription savePrescription(PrescriptionRequest request);

    List<Prescription> getAllPrescriptions();

    Prescription getPrescriptionById(Long id);

    void deletePrescription(Long id);

    Prescription updatePrescription(Long id, @Valid PrescriptionRequest request);
}