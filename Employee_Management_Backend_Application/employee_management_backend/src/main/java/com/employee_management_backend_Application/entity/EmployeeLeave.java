package com.employee_management_backend_Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "leave_details")
public class EmployeeLeave {
    @Id
    private Integer employeeId;
    private Integer noOfEarnedLeaveTaken;
    private Integer noOfEarnedLeaveAvailable;
    private Integer noOfLeaveWithoutPayTacken;
    private LocalDate leaveTackenDate;
    private LocalDate leaveFromDate;
    private LocalDate leaveToDate;
}
