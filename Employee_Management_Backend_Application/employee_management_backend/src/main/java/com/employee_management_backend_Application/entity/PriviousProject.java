package com.employee_management_backend_Application.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.transaction.annotation.Transactional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "privious_project_details")
public class PriviousProject {
    @Id
    private Integer priviousProjectId;
    private String priviousProjectTitle;
    private String priviousProjectLink;
    private String priviousProjectDescription;
    private String priviousProjectObjective;
    private Integer employeeId;
}
