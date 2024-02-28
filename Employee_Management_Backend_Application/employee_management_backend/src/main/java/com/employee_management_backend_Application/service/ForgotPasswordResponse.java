package com.employee_management_backend_Application.service;

import lombok.*;

@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForgotPasswordResponse {
   private Integer otpFromServer;
}
