package com.employee_management_backend_Application.controller;

import com.employee_management_backend_Application.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("${employeeManagement.base.URL}")
public class AttendanceController {

    @Autowired
    private  EmployeeAttendanceServices employeeAttendanceServices;
    @PostMapping("${employeeManagement.attendance.punchIn}")
    public ResponseEntity<AttendancePunchInResponse> attendancePunchIn(@RequestBody AttendancePunchInRequest attendancePunchInRequest)
    {
        return new ResponseEntity<>(employeeAttendanceServices.attendancePunchIn(attendancePunchInRequest), HttpStatus.CREATED);
    }
    @PostMapping("${employeeManagement.attendance.punchOut}")
    public ResponseEntity<AttendancePunchOutResponce> attendancePunchOut(@RequestBody AttendancePunchOutRequest attendancePunchOutRequest)
    {
        return new ResponseEntity<>(employeeAttendanceServices.attendancePunchOut(attendancePunchOutRequest),HttpStatus.CREATED);
    }
    @GetMapping("${employeeManagement.attendance.getAllAttendanceRecord}")
    public ResponseEntity<List<AttendanceViewResponse>> getAllAttendanceRecord()
    {
        return new ResponseEntity<>(employeeAttendanceServices.getAllAttendanceRecord(),HttpStatus.OK);
    }
}
