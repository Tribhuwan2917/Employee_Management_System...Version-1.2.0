package com.employee_management_backend_Application.exception;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PriviousProjectExceptionResponse {
    private String priviousProjectExceptionMessage;
    private Integer priviousProjectStatusCode;
}
