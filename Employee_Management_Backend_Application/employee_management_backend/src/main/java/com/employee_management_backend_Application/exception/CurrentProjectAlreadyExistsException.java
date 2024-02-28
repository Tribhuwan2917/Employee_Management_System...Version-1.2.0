package com.employee_management_backend_Application.exception;

public class CurrentProjectAlreadyExistsException extends RuntimeException{
    public CurrentProjectAlreadyExistsException(String message)
    {
        super(message);
    }
}
