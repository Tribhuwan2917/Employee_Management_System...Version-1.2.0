package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.EmployeeLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeLeaveRepository extends JpaRepository<EmployeeLeave,Integer> {
}
