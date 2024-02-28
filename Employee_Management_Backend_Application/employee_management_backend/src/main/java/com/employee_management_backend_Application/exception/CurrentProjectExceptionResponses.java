package com.employee_management_backend_Application.exception;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CurrentProjectExceptionResponses {
  private  String exceptionMessage;
  private Integer exceptionStatusCode;
}
