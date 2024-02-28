package com.employee_management_backend_Application.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PriviousProjectExceptionHandler {
    @ExceptionHandler(PriviousProjectNotFoundException.class)
    public ResponseEntity<PriviousProjectExceptionResponse> priviousProjectNotFoundExceptionHandler(PriviousProjectNotFoundException priviousProjectNotFoundException)
    {
        PriviousProjectExceptionResponse priviousProjectExceptionResponse=new PriviousProjectExceptionResponse();
        priviousProjectExceptionResponse.setPriviousProjectExceptionMessage(priviousProjectNotFoundException.getMessage());
        priviousProjectExceptionResponse.setPriviousProjectStatusCode(404);
        return new ResponseEntity<>(priviousProjectExceptionResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(PriviousProjectAlreadyExistsException.class)
    public ResponseEntity<PriviousProjectExceptionResponse> priviousProjectAlreadyExistsExceptionHandler(PriviousProjectAlreadyExistsException priviousProjectAlreadyExistsException)
    {
        PriviousProjectExceptionResponse priviousProjectExceptionResponse=new PriviousProjectExceptionResponse();
        priviousProjectExceptionResponse.setPriviousProjectExceptionMessage(priviousProjectAlreadyExistsException.getMessage());
        priviousProjectExceptionResponse.setPriviousProjectStatusCode(400);
        return new ResponseEntity<>(priviousProjectExceptionResponse,HttpStatus.BAD_REQUEST);
    }
}
