package com.employee_management_backend_Application.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CurrentProjectExceptionHandler {
    @ExceptionHandler(CurrentProjectNotFoundException.class)
    public ResponseEntity<CurrentProjectExceptionResponses> currentProjectNotFoundExceptionHandler(CurrentProjectNotFoundException currentProjectNotFoundException)
    {
        CurrentProjectExceptionResponses currentProjectExceptionResponses=new CurrentProjectExceptionResponses();
        currentProjectExceptionResponses.setExceptionMessage(currentProjectNotFoundException.getMessage());
        currentProjectExceptionResponses.setExceptionStatusCode(404);
        return new ResponseEntity<>(currentProjectExceptionResponses, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(CurrentProjectAlreadyExistsException.class)
    public ResponseEntity<CurrentProjectExceptionResponses> currentProjectAlreadyExistsExceptionHandler(CurrentProjectAlreadyExistsException currentProjectAlreadyExistsException)
    {
        CurrentProjectExceptionResponses currentProjectExceptionResponses=new CurrentProjectExceptionResponses();
        currentProjectExceptionResponses.setExceptionMessage(currentProjectAlreadyExistsException.getMessage());
        currentProjectExceptionResponses.setExceptionStatusCode(400);
        return new ResponseEntity<>(currentProjectExceptionResponses,HttpStatus.BAD_REQUEST);
    }

}
