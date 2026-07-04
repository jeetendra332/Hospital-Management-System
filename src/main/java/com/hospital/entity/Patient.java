package com.hospital.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;

    private String patientName;

    private Integer age;

    private String gender;

    private String phone;

    @JsonIgnore
    @OneToMany(mappedBy = "patient")
    private List<Appointment> appointments;
}