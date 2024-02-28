package com.employee_management_backend_Application.controller;

import com.employee_management_backend_Application.service.EmployeeProfileResponse;
import com.employee_management_backend_Application.service.EmployeeProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("${employeeManagement.base.URL}")
public class EmployeeProfileController {
    @Autowired
    private EmployeeProfileService employeeProfileService;
    @GetMapping("${employeeManagement.profile.getProfileByEmailId}")
    public ResponseEntity<EmployeeProfileResponse> getEmployeeProfileByEmailId(@PathVariable("employeeEmailId") String employeeEmailId)
    {

        return new ResponseEntity<EmployeeProfileResponse>(employeeProfileService.getProfileByEmailId(employeeEmailId), HttpStatus.OK);
    }
}
