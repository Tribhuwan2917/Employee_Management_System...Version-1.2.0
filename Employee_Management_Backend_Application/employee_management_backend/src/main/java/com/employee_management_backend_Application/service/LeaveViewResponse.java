package com.employee_management_backend_Application.service;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LeaveViewResponse {
    private Integer employeeId;
    private Integer noOfEarnedLeaveTaken;
    private Integer noOfEarnedLeaveAvailable;
    private Integer noOfLeaveWithoutPayTacken;
    private LocalDate leaveTackenDate;
    private LocalDate leaveFromDate;
    private LocalDate leaveToDate;
}
