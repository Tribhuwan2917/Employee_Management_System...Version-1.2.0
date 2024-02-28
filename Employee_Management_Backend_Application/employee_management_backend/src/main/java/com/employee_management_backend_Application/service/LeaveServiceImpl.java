package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.entity.EmployeeDetails;
import com.employee_management_backend_Application.entity.EmployeeLeave;
import com.employee_management_backend_Application.exception.LeaveException;
import com.employee_management_backend_Application.repository.EmployeeDetailsRepository;
import com.employee_management_backend_Application.repository.EmployeeLeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LeaveServiceImpl implements LeaveServices{
    @Autowired
    private EmployeeLeaveRepository employeeLeaveRepository;
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;
    @Override
    public ApplyingLeaveResponse applyLeave(ApplyingLeaveRequest applyingLeaveRequest) {
        if(employeeDetailsRepository.existsById(applyingLeaveRequest.getEmployeeId()))
        {
            EmployeeDetails employeeDetails=employeeDetailsRepository.findById(applyingLeaveRequest.getEmployeeId()).get();
            if(employeeDetails.getEmployeeEmail().equals(applyingLeaveRequest.getEmployeeEmailId())) {
                Optional<EmployeeLeave> employeeLeaveDBOptional = employeeLeaveRepository.findById(applyingLeaveRequest.getEmployeeId());
                    EmployeeLeave employeeLeaveDB = employeeLeaveDBOptional.get();
                    if (applyingLeaveRequest.getLeaveType().equals("Earned Leave"))
                    {
                        Period period = Period.between(applyingLeaveRequest.getToDate(), applyingLeaveRequest.getFromDate());
                        int noOfEarnedLeaveDays = Math.abs(period.getDays())+Math.abs(period.getMonths()*30)+Math.abs(period.getYears()*365);
                        System.out.println(noOfEarnedLeaveDays);
                        if (noOfEarnedLeaveDays <= employeeLeaveDB.getNoOfEarnedLeaveAvailable())
                        {
                            EmployeeLeave employeeLeave = new EmployeeLeave();
                            employeeLeave.setEmployeeId(applyingLeaveRequest.getEmployeeId());
                            employeeLeave.setNoOfEarnedLeaveTaken(employeeLeaveDB.getNoOfEarnedLeaveTaken() + noOfEarnedLeaveDays);
                            employeeLeave.setNoOfLeaveWithoutPayTacken(employeeLeaveDB.getNoOfLeaveWithoutPayTacken());
                            employeeLeave.setNoOfEarnedLeaveAvailable(employeeLeaveDB.getNoOfEarnedLeaveAvailable() - noOfEarnedLeaveDays);
                            employeeLeave.setLeaveTackenDate(LocalDate.now());
                            employeeLeave.setLeaveToDate(applyingLeaveRequest.getToDate());
                            employeeLeave.setLeaveFromDate(applyingLeaveRequest.getFromDate());
                            employeeLeaveRepository.save(employeeLeave);
                            return new ApplyingLeaveResponse("Earn Leave applying Succcessfully with employee Id: " + applyingLeaveRequest.getEmployeeId());
                        } else
                        {
                            throw new LeaveException("UnSufficient Eearn leave");
                        }
                    } else
                    {
                        Period period = Period.between(applyingLeaveRequest.getToDate(), applyingLeaveRequest.getFromDate());
                        int noOfLeaveWioutPayDays = Math.abs(period.getDays())+Math.abs(period.getMonths()*30)+Math.abs(period.getYears()*365);
                        EmployeeLeave employeeLeave=new EmployeeLeave();
                        employeeLeave.setEmployeeId(employeeLeaveDB.getEmployeeId());
                        employeeLeave.setLeaveTackenDate(LocalDate.now());
                        employeeLeave.setLeaveToDate(applyingLeaveRequest.getToDate());
                        employeeLeave.setLeaveFromDate(applyingLeaveRequest.getFromDate());
                        employeeLeave.setNoOfLeaveWithoutPayTacken(employeeLeaveDB.getNoOfLeaveWithoutPayTacken()+noOfLeaveWioutPayDays);
                        employeeLeave.setNoOfEarnedLeaveAvailable(employeeLeaveDB.getNoOfEarnedLeaveAvailable());
                        employeeLeave.setNoOfEarnedLeaveTaken(employeeLeaveDB.getNoOfEarnedLeaveTaken());
                        employeeLeaveRepository.save(employeeLeave);
                     return new ApplyingLeaveResponse("Leave Without Pay Applying Successfully! with employee Id: "+applyingLeaveRequest.getEmployeeId());
                    }
                }
            else {
                throw new LeaveException("Unauthorized for Applying leave with this email Id");
            }
        }
        else {
            throw new LeaveException("Employee does not Exists with employee Id: "+applyingLeaveRequest.getEmployeeId());
        }
    }

    @Override
    public List<LeaveViewResponse> getLeaveRecords() {
        List<EmployeeLeave> employeeLeaveList=employeeLeaveRepository.findAll();
        if (employeeLeaveList.isEmpty())
        {
            throw new LeaveException("No Leave Record Found");
        }else {
            List<LeaveViewResponse> leaveViewResponseList=new ArrayList<LeaveViewResponse>();
            for(EmployeeLeave employeeLeave:employeeLeaveList)
            {
                LeaveViewResponse leaveViewResponse=new LeaveViewResponse();
                leaveViewResponse.setEmployeeId(employeeLeave.getEmployeeId());
                leaveViewResponse.setNoOfEarnedLeaveTaken(employeeLeave.getNoOfEarnedLeaveTaken());
                leaveViewResponse.setNoOfEarnedLeaveAvailable(employeeLeave.getNoOfEarnedLeaveAvailable());
                leaveViewResponse.setLeaveTackenDate(employeeLeave.getLeaveTackenDate());
                leaveViewResponse.setLeaveFromDate(employeeLeave.getLeaveFromDate());
                leaveViewResponse.setLeaveToDate(employeeLeave.getLeaveToDate());
                leaveViewResponse.setNoOfLeaveWithoutPayTacken(employeeLeave.getNoOfLeaveWithoutPayTacken());
                leaveViewResponseList.add(leaveViewResponse);
            }
            return leaveViewResponseList;
        }
    }
}
