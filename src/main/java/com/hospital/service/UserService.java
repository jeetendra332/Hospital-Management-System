package com.hospital.service;

import com.hospital.dto.LoginRequest;
import com.hospital.dto.RegisterRequest;
import com.hospital.entity.User;

public interface UserService {

    User registerUser(RegisterRequest request);

    String loginUser(LoginRequest request);
}