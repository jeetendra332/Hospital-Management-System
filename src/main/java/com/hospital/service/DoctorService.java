package com.hospital.service;

import com.hospital.dto.DoctorRequest;
import com.hospital.entity.Doctor;

import java.util.List;

public interface DoctorService {

    Doctor saveDoctor(DoctorRequest request);

    List<Doctor> getAllDoctors();

    Doctor getDoctorById(Long id);

    Doctor updateDoctor(Long id, DoctorRequest request);

    void deleteDoctor(Long id);
}