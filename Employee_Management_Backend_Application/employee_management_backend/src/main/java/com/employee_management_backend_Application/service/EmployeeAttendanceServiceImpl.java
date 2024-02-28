package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.entity.EmployeeAttendence;
import com.employee_management_backend_Application.entity.EmployeeDetails;
import com.employee_management_backend_Application.exception.AttendanceException;
import com.employee_management_backend_Application.repository.EmployeeAttendanceRepository;
import com.employee_management_backend_Application.repository.EmployeeDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeAttendanceServiceImpl implements EmployeeAttendanceServices{
    @Autowired
    private   EmployeeAttendanceRepository employeeAttendanceRepository;
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;
    @Override
    public AttendancePunchInResponse attendancePunchIn(AttendancePunchInRequest attendancePunchInRequest) {
        System.out.println(attendancePunchInRequest);
        if (employeeDetailsRepository.existsById(attendancePunchInRequest.getEmployeeId()))
        {
            if(!employeeAttendanceRepository.existsById(attendancePunchInRequest.getEmployeeId())) {
                EmployeeDetails employeeDetails=employeeDetailsRepository.findById(attendancePunchInRequest.getEmployeeId()).get();
                System.out.println(employeeDetails.getEmployeeEmail());
                System.out.println(attendancePunchInRequest.getEmployeeEmailId());
                System.out.println(attendancePunchInRequest.getEmployeeEmailId().equals(employeeDetails.getEmployeeEmail()));
                if(employeeDetails.getEmployeeEmail().equals(attendancePunchInRequest.getEmployeeEmailId())) {
                    EmployeeAttendence employeeAttendence = new EmployeeAttendence();
                    employeeAttendence.setEmployeeId(attendancePunchInRequest.getEmployeeId());
                    employeeAttendence.setInTime(LocalTime.now());
                    employeeAttendence.setDate(LocalDate.now());
                    employeeAttendanceRepository.save(employeeAttendence);
                }
                else {
                 throw new AttendanceException("Incurrect email Id");
                }
            }
                AttendancePunchInResponse attendancePunchInResponse = new AttendancePunchInResponse();
                attendancePunchInResponse.setMessage("Employee Successfully Punch In with employee Id: " + attendancePunchInRequest.getEmployeeId());
                return attendancePunchInResponse;
        }
        else {
           throw new AttendanceException("Employee Not Found for employee Id: "+attendancePunchInRequest.getEmployeeId());
        }

    }

    @Override
    public AttendancePunchOutResponce attendancePunchOut(AttendancePunchOutRequest attendancePunchOutRequest) {
        if(employeeDetailsRepository.existsById(attendancePunchOutRequest.getEmployeeId()))
        {
            if(employeeAttendanceRepository.existsById(attendancePunchOutRequest.getEmployeeId()))
            {
                EmployeeDetails employeeDetails=employeeDetailsRepository.findById(attendancePunchOutRequest.getEmployeeId()).get();
                System.out.println(employeeDetails);
                System.out.println(attendancePunchOutRequest.getEmployeeEmailId());
                if(employeeDetails.getEmployeeEmail().equals(attendancePunchOutRequest.getEmployeeEmailId())) {
                    EmployeeAttendence employeeAttendence = new EmployeeAttendence();
                    employeeAttendence.setEmployeeId(attendancePunchOutRequest.getEmployeeId());
                    employeeAttendence.setOutTime(LocalTime.now());
                    EmployeeAttendence employeeAttendenceDatabase = employeeAttendanceRepository.findById(attendancePunchOutRequest.getEmployeeId()).get();
                    double workingHour = LocalTime.now().getHour() - employeeAttendenceDatabase.getInTime().getHour();
                    double workingMinute = LocalTime.now().getMinute() - employeeAttendenceDatabase.getInTime().getMinute();
                        employeeAttendence.setWorkingHour((workingHour + (workingMinute / 60)));
                    employeeAttendence.setDate(employeeAttendenceDatabase.getDate());
                    employeeAttendence.setInTime(employeeAttendenceDatabase.getInTime());
                    employeeAttendanceRepository.save(employeeAttendence);
                    return new AttendancePunchOutResponce("Employee PunchOut Successfully with employee Id: " + attendancePunchOutRequest.getEmployeeId());
                }else {
                    throw new AttendanceException("Incurrect email Id");
                }
            }
            else {
                throw new AttendanceException("Employee does not PunchIn with employee Id: " + attendancePunchOutRequest.getEmployeeId());
            }
        }
        else {
            throw new AttendanceException("Employee does not exitst with employee Id: " + attendancePunchOutRequest.getEmployeeId());
        }
    }

    @Override
    public List<AttendanceViewResponse> getAllAttendanceRecord() {
        List<EmployeeAttendence> employeeAttendenceList=employeeAttendanceRepository.findAll();
        if(employeeAttendenceList!=null&&!employeeAttendenceList.isEmpty())
        {
            List<AttendanceViewResponse> attendanceViewResponseList=new ArrayList<AttendanceViewResponse>();
            for(EmployeeAttendence employeeAttendence:employeeAttendenceList)
            {
                AttendanceViewResponse attendanceViewResponse=new AttendanceViewResponse();
                attendanceViewResponse.setEmployeeId(employeeAttendence.getEmployeeId());
                attendanceViewResponse.setDate(employeeAttendence.getDate());
                attendanceViewResponse.setWorkingHour(employeeAttendence.getWorkingHour());
                attendanceViewResponse.setTimeIn(employeeAttendence.getInTime());
                attendanceViewResponse.setTimeOut(employeeAttendence.getOutTime());
                attendanceViewResponseList.add(attendanceViewResponse);
            }
            return attendanceViewResponseList;
        }
        else {
            throw new AttendanceException("No any Attendace Record found for Employee");
        }
    }
}
