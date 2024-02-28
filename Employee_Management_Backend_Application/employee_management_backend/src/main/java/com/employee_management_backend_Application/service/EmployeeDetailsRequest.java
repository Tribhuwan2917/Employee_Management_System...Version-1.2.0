package com.employee_management_backend_Application.service;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeeDetailsRequest {

    private Integer employeeId;
    private String employeeFirstName;
    private String employeeLastName;
    private String employeeEmail;
    private String employeeCountry;
    private String employeeDesignation;
    private String employeeAddressCity;
    private Integer employeeSalaryPerMonth;
    private String employeeGender;
    private String employeeImageUrl;
    private String employeeMobileNo;
}
