package com.employee_management_backend_Application;

import com.employee_management_backend_Application.entity.*;
import com.employee_management_backend_Application.repository.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.reactive.context.ConfigurableReactiveWebApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@SpringBootApplication
public class
EmployeeManagementBackendApplicationApiApplication {
	public static void main(String[] args) throws IOException {
		ConfigurableApplicationContext ctx = SpringApplication.run(EmployeeManagementBackendApplicationApiApplication.class, args);
		RegistrationRepository registrationRepository = ctx.getBean(RegistrationRepository.class);
		EmployeeDetailsRepository employeeDetailsRepository = ctx.getBean(EmployeeDetailsRepository.class);
		PriviousProjectRepository priviousProjectRepository = ctx.getBean(PriviousProjectRepository.class);
		CurrentProjectRepository currentProjectRepository=ctx.getBean(CurrentProjectRepository.class);
		EmployeeAttendanceRepository employeeAttendanceRepository=ctx.getBean(EmployeeAttendanceRepository.class);
		//EmployeeAttendence employeeAttendence=new EmployeeAttendence();
//		employeeAttendence.setEmployeeId(1);
//		employeeAttendence.setDate(LocalDate.now());
//		employeeAttendence.setInTime(LocalTime.of(2,33,20));
//		employeeAttendence.setOutTime(LocalTime.of(3,45,8));
//		employeeAttendence.setWorkingHour(9.6);
//		employeeAttendanceRepository.save(employeeAttendence);
//		Integer noOfRowInCurrentProject= currentProjectRepository.getNoOfCountByEmployeeId(8);
//		Integer noOfRowInPriviousProject=priviousProjectRepository.getNoOfCountByEmployeeId(8);
//		priviousProjectRepository.deletePriviousProjectByEmployeeId(888);
//		System.out.println("No of Row");
//		System.out.println(noOfRowInPriviousProject);
	//	currentProjectRepository.deleteCurrentProjectByEmployeeId(10);
//		System.out.println(employeeDetailsRepository.getEmployeeDetailsByEmployeeEmail("electronics8499@gmail.com"));

	}
}