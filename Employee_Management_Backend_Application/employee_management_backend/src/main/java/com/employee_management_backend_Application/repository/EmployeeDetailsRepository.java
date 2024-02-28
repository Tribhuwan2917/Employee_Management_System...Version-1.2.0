package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.EmployeeDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EmployeeDetailsRepository extends JpaRepository<EmployeeDetails,Integer> {
    @Query("SELECT  employeeDetails from EmployeeDetails  employeeDetails where employeeDetails.employeeEmail=:employeeEmail")
    public List<EmployeeDetails> getEmployeeDetailsByEmployeeEmail(String employeeEmail);
}
