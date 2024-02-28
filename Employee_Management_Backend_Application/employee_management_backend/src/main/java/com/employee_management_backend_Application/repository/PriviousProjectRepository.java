package com.employee_management_backend_Application.repository;

import com.employee_management_backend_Application.entity.CurrentProject;
import com.employee_management_backend_Application.entity.PriviousProject;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PriviousProjectRepository extends JpaRepository<PriviousProject,Integer> {
    @Query("select priviousProject from PriviousProject priviousProject where priviousProject.employeeId=:employeeId")
    public List<PriviousProject> findPriviousProjectByEmployeeId(Integer employeeId);
    @Modifying
    @Transactional
    @Query(value = "delete from privious_project_details  ppd where ppd.employee_id=:employeeId",nativeQuery = true)
    public void deletePriviousProjectByEmployeeId(@Param("employeeId") Integer employeeId);
    @Query(value = "select count (*) from PriviousProject  priviousProject where priviousProject.employeeId=:employeeId")
    public Integer getNoOfCountByEmployeeId(@Param("employeeId") Integer employeeId);

}
