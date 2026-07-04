package com.hospital.controller;

import com.hospital.dto.BillRequest;
import com.hospital.entity.Bill;
import com.hospital.service.BillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bills")
public class BillController {

    private final BillService service;

    public BillController(BillService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Bill> addBill(
            @Valid @RequestBody BillRequest request) {

        Bill bill = service.saveBill(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bill);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateBill(
            @PathVariable Long id,
            @Valid @RequestBody BillRequest request) {

        Bill bill = service.updateBill(id, request);

        return ResponseEntity.ok(bill);
    }

    @GetMapping
    public ResponseEntity<List<Bill>> getBills() {

        return ResponseEntity.ok(service.getAllBills());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBill(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.getBillById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBill(
            @PathVariable Long id) {

        service.deleteBill(id);

        return ResponseEntity.noContent().build();
    }
}