package com.employee_management_backend_Application.service;

import java.util.List;

public interface LeaveServices {
    public ApplyingLeaveResponse applyLeave(ApplyingLeaveRequest applyingLeaveRequest);
    public List<LeaveViewResponse> getLeaveRecords();
}
