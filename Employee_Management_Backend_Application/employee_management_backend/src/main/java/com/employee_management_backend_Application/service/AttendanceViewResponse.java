package com.employee_management_backend_Application.service;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceViewResponse {
    private Integer employeeId;
    private LocalDate date;
    private Double workingHour;
    private LocalTime timeIn;
    private LocalTime timeOut;
}
