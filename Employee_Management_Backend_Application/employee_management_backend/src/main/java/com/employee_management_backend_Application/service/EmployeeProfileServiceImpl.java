package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.entity.EmployeeDetails;
import com.employee_management_backend_Application.exception.EmployeeDetailsNotFoundException;
import com.employee_management_backend_Application.repository.EmployeeDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class EmployeeProfileServiceImpl implements EmployeeProfileService{
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;
    @Override
    public EmployeeProfileResponse getProfileByEmailId(String employeeEmail) {
        List<EmployeeDetails> employeeDetailsList=employeeDetailsRepository.getEmployeeDetailsByEmployeeEmail(employeeEmail);
        if(employeeDetailsList.isEmpty())
        {
            throw  new EmployeeDetailsNotFoundException("No Employee Exists With Emaild: "+employeeEmail);
        }else {
            EmployeeDetails employeeDetails=employeeDetailsList.get(0);
            EmployeeProfileResponse employeeProfileResponse=new EmployeeProfileResponse();
            employeeProfileResponse.setEmployeeId(employeeDetails.getEmployeeId());
            employeeProfileResponse.setEmployeeDesignation(employeeDetails.getEmployeeDesignation());
            employeeProfileResponse.setEmployeeMobileNo(employeeDetails.getEmployeeMobileNo());
            employeeProfileResponse.setEmployeeName(employeeDetails.getEmployeeFirstName()+" "+employeeDetails.getEmployeeLastName());
            employeeProfileResponse.setProfileImageUrl(employeeDetails.getEmployeeImageUrl());
            return employeeProfileResponse;
        }

    }
}
