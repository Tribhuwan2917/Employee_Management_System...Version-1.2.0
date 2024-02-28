package com.employee_management_backend_Application.exception;

public class LeaveException extends RuntimeException{
    public LeaveException(String message)
    {
        super(message);
    }
}
