package com.employee_management_backend_Application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class EmployeeDetailsExceptionHandler {
    @ExceptionHandler(EmployeeDetailsAlreadyExistsException.class)
    public ResponseEntity<EmployeeDetailsExceptionResponse> employeeDetailsAlreadyExistsExceptionHandler(EmployeeDetailsAlreadyExistsException employeeDetailsAlreadyExistsException)
    {
        EmployeeDetailsExceptionResponse employeeDetailsExceptionResponse=new EmployeeDetailsExceptionResponse();
        employeeDetailsExceptionResponse.setExceptionMessage(employeeDetailsAlreadyExistsException.getMessage());
        employeeDetailsExceptionResponse.setExceptionStatuisCode(404);
        return new ResponseEntity<>(employeeDetailsExceptionResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(EmployeeDetailsNotFoundException.class)
    public ResponseEntity<EmployeeDetailsExceptionResponse> employeeDetailsNotFoundExceptionHandler(EmployeeDetailsNotFoundException employeeDetailsNotFoundException)
    {

        EmployeeDetailsExceptionResponse employeeDetailsExceptionResponse=new EmployeeDetailsExceptionResponse();
        employeeDetailsExceptionResponse.setExceptionMessage(employeeDetailsNotFoundException.getMessage());
        employeeDetailsExceptionResponse.setExceptionStatuisCode(400);
        return new ResponseEntity<>(employeeDetailsExceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
