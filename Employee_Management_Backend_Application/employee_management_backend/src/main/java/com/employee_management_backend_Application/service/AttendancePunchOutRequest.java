package com.employee_management_backend_Application.service;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AttendancePunchOutRequest {
    private Integer employeeId;
    private String  employeeEmailId;
}
