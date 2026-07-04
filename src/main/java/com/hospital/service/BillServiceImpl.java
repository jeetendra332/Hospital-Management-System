package com.hospital.service;

import com.hospital.dto.BillRequest;
import com.hospital.entity.Bill;
import com.hospital.entity.Patient;
import com.hospital.exception.ResourceNotFoundException;
import com.hospital.repository.BillRepository;
import com.hospital.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    private final BillRepository billRepository;
    private final PatientRepository patientRepository;

    public BillServiceImpl(
            BillRepository billRepository,
            PatientRepository patientRepository) {

        this.billRepository = billRepository;
        this.patientRepository = patientRepository;
    }

    @Override
    public Bill saveBill(BillRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Bill bill = new Bill();

        bill.setAmount(request.getAmount());
        bill.setPaymentStatus(request.getPaymentStatus());
        bill.setPatient(patient);

        return billRepository.save(bill);
    }

    @Override
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    @Override
    public Bill getBillById(Long id) {
        return billRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bill not found with id " + id));
    }

    @Override
    public Bill updateBill(Long id, BillRequest request) {

        Bill bill = billRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Bill not found with id " + id));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        bill.setAmount(request.getAmount());
        bill.setPaymentStatus(request.getPaymentStatus());
        bill.setPatient(patient);

        return billRepository.save(bill);
    }

    @Override
    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}