package com.employee_management_backend_Application.exception;

public class EmployeeDetailsNotFoundException extends RuntimeException{
    public EmployeeDetailsNotFoundException(String message)
    {
        super(message);
    }
}
