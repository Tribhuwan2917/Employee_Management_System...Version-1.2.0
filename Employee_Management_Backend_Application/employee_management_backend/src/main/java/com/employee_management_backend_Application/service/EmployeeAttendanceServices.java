package com.employee_management_backend_Application.service;

import java.util.List;

public interface EmployeeAttendanceServices {
    public AttendancePunchInResponse attendancePunchIn(AttendancePunchInRequest attendancePunchInRequest);
    public AttendancePunchOutResponce attendancePunchOut(AttendancePunchOutRequest attendancePunchOutRequest);
     public List<AttendanceViewResponse> getAllAttendanceRecord();
}
