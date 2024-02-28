package com.employee_management_backend_Application.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class LeaveExceptionHandler {
    @ExceptionHandler(LeaveException.class)
    public String leaveExceptionHandler(LeaveException leaveException)
    {
        return leaveException.getMessage();
    }
}
