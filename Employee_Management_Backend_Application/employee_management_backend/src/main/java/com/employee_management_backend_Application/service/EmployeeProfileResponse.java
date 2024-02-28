package com.employee_management_backend_Application.service;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeeProfileResponse {
    private Integer employeeId;
    private String employeeName;
    private String employeeDesignation;
    private String profileImageUrl;
    private String employeeMobileNo;
}
