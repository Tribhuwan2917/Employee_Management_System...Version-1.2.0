package com.employee_management_backend_Application.exception;

public class RegistrationAlreadyExistException extends RuntimeException{
    public RegistrationAlreadyExistException(String message)
    {
        super(message);
    }
}
