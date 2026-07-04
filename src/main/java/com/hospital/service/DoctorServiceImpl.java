package com.hospital.service;

import com.hospital.dto.DoctorRequest;
import com.hospital.entity.Doctor;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repository;

    public DoctorServiceImpl(DoctorRepository repository) {
        this.repository = repository;
    }

    @Override
    public Doctor saveDoctor(DoctorRequest request) {

        Doctor doctor = new Doctor();

        doctor.setDoctorName(request.getDoctorName());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setDepartment(request.getDepartment());
        doctor.setExperience(request.getExperience());

        return repository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return repository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id " + id));
    }

    @Override
    public Doctor updateDoctor(Long id, DoctorRequest request) {

        Doctor doctor = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id " + id));

        doctor.setDoctorName(request.getDoctorName());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setDepartment(request.getDepartment());
        doctor.setExperience(request.getExperience());

        return repository.save(doctor);
    }

    @Override
    public void deleteDoctor(Long id) {

        Doctor doctor = repository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with id " + id));

        repository.delete(doctor);
    }
}