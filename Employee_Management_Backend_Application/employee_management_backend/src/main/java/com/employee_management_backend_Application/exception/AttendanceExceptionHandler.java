package com.employee_management_backend_Application.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AttendanceExceptionHandler {
    @ExceptionHandler(AttendanceException.class)
    public String attendanceExceptionHandler(AttendanceException attendanceException)
    {
        return attendanceException.getMessage();
    }
}
