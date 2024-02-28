package com.employee_management_backend_Application.service;

import java.util.List;

public interface EmployeeRegistrationService {
    public List<RegisterResponse> getAllRegistration();
    public RegisterResponse getRegisterResponse(String registerEmail);
    public String postRegisterResponse(RegisterResponse registerResponse);
    public String updateRegisterResponse(RegisterResponse registerResponse);
    public String deleteRegisterResponse(String registerEmail);
}
