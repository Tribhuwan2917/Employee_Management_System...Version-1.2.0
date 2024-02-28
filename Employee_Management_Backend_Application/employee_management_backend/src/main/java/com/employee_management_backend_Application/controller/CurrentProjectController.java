package com.employee_management_backend_Application.controller;

import com.employee_management_backend_Application.service.CurrentProjectResponse;
import com.employee_management_backend_Application.service.EmployeeCurrentProjectServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${employeeManagement.base.URL}")
@CrossOrigin
public class CurrentProjectController {
    /*employeeManagement.currentProject.getCurrentProject.URL=/getCurrentProject
employeeManagement.currentProject.getCurrentProjectByEmployeeId.URL=/getCurrentProjectByEmployeeId/{employeeId}
employeeManagement.currentProject.getCurrentProjectByCurrentProjectId.URL=/getCurrentProjectByCurrentProjectId/{currentProjectId}
employeeManagement.currentProject.postCurrentProject.URL=/addCuurentProject
employeeManagement.currentProject.deleteCurrentProject.URL=/deleteCurrentProject/{currentProjectId}
employeeManagement.currentProject.updateCurrentProject.URl=/updateCurrentProject
*/
    @Autowired
    private EmployeeCurrentProjectServices employeeCurrentProjectServices;

    @GetMapping("${employeeManagement.currentProject.getCurrentProject.URL}")
    public ResponseEntity<List<CurrentProjectResponse>> getCurrentProject()
    {
        return new ResponseEntity<>(employeeCurrentProjectServices.getAllCurrentProject(), HttpStatus.OK);
    }
    @GetMapping("${employeeManagement.currentProject.getCurrentProjectByEmployeeId.URL}")
    public ResponseEntity<CurrentProjectResponse> getCurrentProjectByEmployeeId(@PathVariable("employeeId") Integer employeeId)
    {
        return new ResponseEntity<>(employeeCurrentProjectServices.getCurrentProjectByEmployeeId(employeeId),HttpStatus.OK);
    }
    @GetMapping("${employeeManagement.currentProject.getCurrentProjectByCurrentProjectId.URL}")
    public ResponseEntity<CurrentProjectResponse> getCurrentProjectByProjectId(@PathVariable("currentProjectId") Integer currentProjectId)
    {
        return new ResponseEntity<>(employeeCurrentProjectServices.getCurrentProject(),HttpStatus.OK);
    }
    @PostMapping("${employeeManagement.currentProject.postCurrentProject.URL}")
    public ResponseEntity<String> postCurrentProject(@RequestBody CurrentProjectResponse currentProjectResponse)
    {
        return new ResponseEntity<>("Current Project successfully added with CurrentaProject Id: "+employeeCurrentProjectServices.addCurrentProject(currentProjectResponse),HttpStatus.CREATED);
    }
    @DeleteMapping("${employeeManagement.currentProject.deleteCurrentProject.URL}")
    public ResponseEntity<String> deleteCurrentProject(@PathVariable("currentProjectId") Integer currentProjectId)
    {
        return new ResponseEntity<>("Current Project Successfully deleted with Current Project Id: "+employeeCurrentProjectServices.deleteCurrentProject(currentProjectId),HttpStatus.OK);
    }
    @PutMapping("${employeeManagement.currentProject.updateCurrentProject.URl}")
    public ResponseEntity<String> updateCurrentProject(@RequestBody CurrentProjectResponse currentProjectResponse)
    {
        return new ResponseEntity<>("Employee Current Project Successfully updated With Current Project Id"+employeeCurrentProjectServices.updateCurrentProject(currentProjectResponse),HttpStatus.CREATED);
    }

}
