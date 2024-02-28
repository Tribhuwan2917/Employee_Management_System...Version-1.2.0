package com.employee_management_backend_Application.exception;

public class RegistrationNotFoundException extends RuntimeException{
    public RegistrationNotFoundException(String message)
    {
        super(message);
    }
}
