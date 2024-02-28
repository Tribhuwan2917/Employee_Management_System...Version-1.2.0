package com.employee_management_backend_Application.exception;

public class PriviousProjectAlreadyExistsException extends RuntimeException{
    public PriviousProjectAlreadyExistsException(String message)
    {
        super(message);
    }
}
