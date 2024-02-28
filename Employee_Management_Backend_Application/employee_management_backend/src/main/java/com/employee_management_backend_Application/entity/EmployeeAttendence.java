package com.employee_management_backend_Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Entity
@Setter
@Getter
@ToString
public class EmployeeAttendence {
    @Id
    private Integer employeeId;
    private LocalTime inTime;
    private LocalTime outTime;
    private Double workingHour;
    private LocalDate date;
}
