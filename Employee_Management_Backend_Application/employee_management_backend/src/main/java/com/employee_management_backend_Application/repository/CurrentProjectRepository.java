package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.CurrentProject;
import com.employee_management_backend_Application.service.CurrentProjectResponse;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface CurrentProjectRepository extends JpaRepository<CurrentProject,Integer> {
    @Query("select currentProject from CurrentProject  currentProject where currentProject.employeeId=:employeeId")
    public Optional<CurrentProject> getCurrentProjectByEmployeeId(Integer employeeId);
    @Query(value = "select count (*) from CurrentProject  currentProject where currentProject.employeeId=:employeeId")
    public Integer getNoOfCountByEmployeeId(@Param("employeeId") Integer employeeId);
    @Transactional
    @Modifying
    @Query( value = "delete  from CurrentProject  currentProject where currentProject.employeeId=:employeeId")
    public void  deleteCurrentProjectByEmployeeId(@Param("employeeId") Integer employeeId);


}
