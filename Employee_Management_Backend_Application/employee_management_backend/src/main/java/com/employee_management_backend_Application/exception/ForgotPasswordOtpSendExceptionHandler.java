package com.employee_management_backend_Application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ForgotPasswordOtpSendExceptionHandler {
    @ExceptionHandler(ForgotPasswordOtpSendException.class)
    public ResponseEntity<String> forgotPasswordOtpSendExceptionHandler(ForgotPasswordOtpSendException forgotPasswordOtpSendException)
    {
        return new ResponseEntity<>(forgotPasswordOtpSendException.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
