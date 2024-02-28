package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.EmployeeAttendence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeAttendanceRepository extends JpaRepository<EmployeeAttendence,Integer> {
}
