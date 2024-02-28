package com.employee_management_backend_Application.controller;

import com.employee_management_backend_Application.repository.EmployeeLeaveRepository;
import com.employee_management_backend_Application.service.ApplyingLeaveRequest;
import com.employee_management_backend_Application.service.ApplyingLeaveResponse;
import com.employee_management_backend_Application.service.LeaveServices;
import com.employee_management_backend_Application.service.LeaveViewResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("${employeeManagement.base.URL}")
public class LeaveController {
    @Autowired
    private LeaveServices leaveServices;
    @PostMapping("${employeeManagement.leave.apply}")
    public ResponseEntity<ApplyingLeaveResponse> applyingLeave(@RequestBody ApplyingLeaveRequest applyingLeaveRequest)
    {
        System.out.println(applyingLeaveRequest);
        return new ResponseEntity<>(leaveServices.applyLeave(applyingLeaveRequest), HttpStatus.CREATED);

    }
    @GetMapping("${employeeManagement.leave.getLeaveRecord}")
    public ResponseEntity<List<LeaveViewResponse>> getLeaveRecord()
    {
        return new ResponseEntity<>(leaveServices.getLeaveRecords(),HttpStatus.OK);
    }
}
