package com.employee_management_backend_Application.exception;

public class CurrentProjectNotFoundException extends RuntimeException{
    public CurrentProjectNotFoundException(String message)
    {
        super(message);
    }
}
