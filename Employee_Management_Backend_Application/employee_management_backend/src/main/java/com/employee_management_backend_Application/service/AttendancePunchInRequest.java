package com.employee_management_backend_Application.service;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AttendancePunchInRequest {
    private Integer employeeId;
    private String  employeeEmailId;
}
