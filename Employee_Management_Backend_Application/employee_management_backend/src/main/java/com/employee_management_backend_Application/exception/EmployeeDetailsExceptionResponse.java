package com.employee_management_backend_Application.exception;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDetailsExceptionResponse {
    private String exceptionMessage;
    private Integer exceptionStatuisCode;

}
