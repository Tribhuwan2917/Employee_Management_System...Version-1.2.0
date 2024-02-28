package com.employee_management_backend_Application.service;

import java.util.List;

public interface EmployeeProfileService {
    public EmployeeProfileResponse getProfileByEmailId(String employeeEmail);
}
