package com.employee_management_backend_Application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RegistrationExceptionHandler {
    @ExceptionHandler(RegistrationNotFoundException.class)
    public ResponseEntity<RegistrationExceptionResponse> registrationNotFoundExceptionHandler(RegistrationNotFoundException registrationNotFoundException)
    {
        RegistrationExceptionResponse registrationExceptionResponse=new RegistrationExceptionResponse();
        registrationExceptionResponse.setExceptionMessage(registrationNotFoundException.getMessage());
//        registrationExceptionResponse.setExceptionEmailId(registrationNotFoundException.getMessage());
        registrationExceptionResponse.setExceptionStatusCode(404);
        return new ResponseEntity<>(registrationExceptionResponse,HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(RegistrationAlreadyExistException.class)
    public ResponseEntity<RegistrationExceptionResponse> registrationAlreadyExistExceptionHandler(RegistrationAlreadyExistException registrationAlreadyExistException)
    {
        RegistrationExceptionResponse registrationExceptionResponse=new RegistrationExceptionResponse();
        registrationExceptionResponse.setExceptionMessage(registrationAlreadyExistException.getMessage());
//        registrationExceptionResponse.setExceptionEmailId(registrationAlreadyExistException.getMessage());
        registrationExceptionResponse.setExceptionStatusCode(400);
        return new ResponseEntity<>(registrationExceptionResponse,HttpStatus.BAD_REQUEST);
    }
}

