package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.entity.PriviousProject;

import java.util.List;

public interface PriviousProjectServices {
    public List<PriviousProjectResponse> getAllPriviousProject();
    public PriviousProjectResponse getPriviousProject(Integer priviousProjectId);
    public Integer postPriviousProject(PriviousProjectResponse priviousProjectResponse);
    public Integer deletePriviousProject(Integer priviousProjectId);
    public Integer updatePriviousProject(PriviousProjectResponse priviousProjectResponse);

    List<PriviousProjectResponse> getPriviousProjectByEmployeeId(Integer employeeId);
}
