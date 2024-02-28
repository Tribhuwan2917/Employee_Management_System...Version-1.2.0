package com.employee_management_backend_Application.service;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RegisterResponse {
    private String registrationEmail;
    private String registraionPassword;
}
