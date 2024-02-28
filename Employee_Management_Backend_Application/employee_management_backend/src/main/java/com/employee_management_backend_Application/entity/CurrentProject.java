package com.employee_management_backend_Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class CurrentProject {
    @Id
    private Integer currentProjectId;
    private String currentProjectTitle;
    private String currentProjectLink;
    private String currentProjectDescription;
    private String currentProjectObjective;
    private Integer employeeId;
}
