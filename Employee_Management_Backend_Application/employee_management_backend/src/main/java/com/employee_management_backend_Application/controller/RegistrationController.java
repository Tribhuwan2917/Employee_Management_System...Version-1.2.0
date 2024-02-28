package com.employee_management_backend_Application.controller;

import com.employee_management_backend_Application.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("${employeeManagement.base.URL}")
@CrossOrigin
public class RegistrationController {
   @Autowired
   private ForgotPassordService forgotPassordService;
    @Autowired
    private EmployeeRegistrationService employeeService;
    @GetMapping("${employeeManagement.registration.getAllRegistration.URL}")
    public ResponseEntity<List<RegisterResponse>> getAllRegistration()
    {
return new ResponseEntity<>(employeeService.getAllRegistration(),HttpStatus.OK);
    }
    @GetMapping("${employeeManagement.registration.getRegistration.URL}")
    public ResponseEntity<RegisterResponse> getRegistration(@PathVariable("registrationEmailId") String registrationEmailId)
    {
        return new ResponseEntity<>(employeeService.getRegisterResponse(registrationEmailId), HttpStatus.OK);
    }
    @PostMapping("${employeeManagement.registration.postRegistration.URL}")
    public ResponseEntity<String> addRegistration(@RequestBody RegisterResponse registerResponse)
    {
        return new ResponseEntity<>("employee Successfully register with Email Id: "+employeeService.postRegisterResponse(registerResponse),HttpStatus.CREATED);
    }
    @DeleteMapping("${employeeManagement.registration.deleteRegistration.URL}")
    public ResponseEntity<String> deleteRegistration(@PathVariable("registrationEmailId") String registrationEmailId)
    {
        return new ResponseEntity<>("employee Successfully log out with Email Id: "+employeeService.deleteRegisterResponse(registrationEmailId),HttpStatus.OK);
    }
    @PutMapping("${employeeManagement.registration.updateRegistration.URL}")
    public ResponseEntity<String> updateRegistration(@RequestBody RegisterResponse registerResponse)
    {
        return new ResponseEntity<>("employee Password  Successfully updated with Email Id: "+employeeService.updateRegisterResponse(registerResponse),HttpStatus.CREATED);
    }
    @PostMapping("${employeeManagement.registration.forgotPasswordEmail.URL}")
    public ResponseEntity<ForgotPasswordResponse> postForgotPasswordEmail(@RequestBody ForgotPasswordRequest forgotPasswordRequest)throws IOException
    {
        return new ResponseEntity<>(forgotPassordService.forgotPosswordOtpVerification(forgotPasswordRequest),HttpStatus.OK);
    }
}
