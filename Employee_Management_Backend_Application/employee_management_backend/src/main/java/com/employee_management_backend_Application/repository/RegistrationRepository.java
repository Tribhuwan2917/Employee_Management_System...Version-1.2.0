package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<Registration,String>{

}
