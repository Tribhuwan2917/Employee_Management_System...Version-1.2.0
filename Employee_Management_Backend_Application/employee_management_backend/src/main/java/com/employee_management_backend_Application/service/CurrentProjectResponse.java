package com.employee_management_backend_Application.service;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CurrentProjectResponse {
    private Integer currentProjectId;
    private String currentProjectTitle;
    private String currentProjectLink;
    private String currentProjectDescription;
    private String currentProjectObjective;
    private Integer employeeId;
}
