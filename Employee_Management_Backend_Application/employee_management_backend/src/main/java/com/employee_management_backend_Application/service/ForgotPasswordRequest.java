package com.employee_management_backend_Application.service;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordRequest {
    private  String registrationEmail;
}
