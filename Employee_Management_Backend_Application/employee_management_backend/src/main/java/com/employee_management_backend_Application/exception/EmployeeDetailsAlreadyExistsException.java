package com.employee_management_backend_Application.exception;

public class EmployeeDetailsAlreadyExistsException extends RuntimeException{
    public EmployeeDetailsAlreadyExistsException(String message)
    {
        super(message);
    }
}
