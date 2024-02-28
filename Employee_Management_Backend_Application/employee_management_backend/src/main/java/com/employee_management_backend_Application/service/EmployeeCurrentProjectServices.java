package com.employee_management_backend_Application.service;

import java.util.List;

public interface EmployeeCurrentProjectServices {
    public CurrentProjectResponse getCurrentProjectByEmployeeId(Integer employeeId);
    public CurrentProjectResponse getCurrentProject();
    public Integer addCurrentProject(CurrentProjectResponse currentProjectResponse);
    public Integer deleteCurrentProject(Integer currentProjectId);
    public Integer updateCurrentProject(CurrentProjectResponse currentProjectResponse);

    List<CurrentProjectResponse> getAllCurrentProject();
}
