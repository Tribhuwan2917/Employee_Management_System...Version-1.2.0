package com.employee_management_backend_Application.service;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApplyingLeaveRequest {
    private Integer employeeId;
    private String leaveType;
    private LocalDate toDate;
    private LocalDate fromDate;
    private String employeeEmailId;
}
