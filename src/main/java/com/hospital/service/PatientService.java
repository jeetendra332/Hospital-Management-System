package com.hospital.service;

import com.hospital.dto.PatientRequest;
import com.hospital.entity.Patient;
import jakarta.validation.Valid;

import java.util.List;

public interface PatientService {

    Patient savePatient(PatientRequest request);

    List<Patient> getAllPatients();

    Patient getPatientById(Long id);

    void deletePatient(Long id);

    Patient updatePatient(Long id, @Valid PatientRequest request);
}