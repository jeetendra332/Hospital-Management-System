package com.hospital.service;

import com.hospital.dto.PatientRequest;
import com.hospital.entity.Patient;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository repository;

    public PatientServiceImpl(PatientRepository repository) {
        this.repository = repository;
    }

    @Override
    public Patient savePatient(PatientRequest request) {

        Patient patient = new Patient();

        patient.setPatientName(request.getPatientName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setPhone(request.getPhone());

        return repository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return repository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id " + id));
    }

    @Override
    public Patient updatePatient(Long id, PatientRequest request) {

        Patient patient = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with id " + id));

        patient.setPatientName(request.getPatientName());
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setPhone(request.getPhone());

        return repository.save(patient);
    }

    @Override
    public void deletePatient(Long id) {
        repository.deleteById(id);
    }
}