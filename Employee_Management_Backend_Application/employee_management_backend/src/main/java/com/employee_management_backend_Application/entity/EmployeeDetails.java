package com.employee_management_backend_Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDetails {
    @Id
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
