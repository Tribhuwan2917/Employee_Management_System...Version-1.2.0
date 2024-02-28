package com.employee_management_backend_Application.service;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class EmployeeDetailsResponse {
    private Integer employeeId;
    private String employeeFirstName;
    private String employeeLastName;
    private String employeeEmail;
    private String employeeCountry;
    private String employeeDesignation;
    private String employeeAddressCity;
    private Integer employeeSalaryPerMonth;
    private Integer employeeCurrentProjectId;
    private String employeeGender;
    private String employeeMobileNo;
    private List<Integer> employeePriviousProjectIds;
    private String employeeImageUrl;
}
