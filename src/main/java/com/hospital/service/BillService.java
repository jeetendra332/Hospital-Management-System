package com.hospital.service;

import com.hospital.dto.BillRequest;
import com.hospital.entity.Bill;
import jakarta.validation.Valid;

import java.util.List;

public interface BillService {

    Bill saveBill(BillRequest request);

    List<Bill> getAllBills();

    Bill getBillById(Long id);

    void deleteBill(Long id);

    Bill updateBill(Long id, @Valid BillRequest request);
}