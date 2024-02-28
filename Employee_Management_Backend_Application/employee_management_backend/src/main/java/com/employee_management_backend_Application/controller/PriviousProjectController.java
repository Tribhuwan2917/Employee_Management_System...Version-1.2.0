package com.employee_management_backend_Application.controller;

import com.employee_management_backend_Application.service.PriviousProjectResponse;
import com.employee_management_backend_Application.service.PriviousProjectServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${employeeManagement.base.URL}")
@CrossOrigin
public class PriviousProjectController {
    @Autowired
    private PriviousProjectServices priviousProjectServices;
    @GetMapping("${employeeManagement.priviousProject.getAllPriviousProject.URL}")
    public ResponseEntity<List<PriviousProjectResponse>> getAllPriviousProject()
    {
        return new ResponseEntity<>(priviousProjectServices.getAllPriviousProject(), HttpStatus.OK);
    }
    @GetMapping("${employeeManagement.priviousProject.getPriviousProjectByEmployeeId}")
    public ResponseEntity <List<PriviousProjectResponse>> getPriviousProjectByEmployeeId(@PathVariable("employeeId") Integer employeeId)
    {
        return new ResponseEntity<>(priviousProjectServices.getPriviousProjectByEmployeeId(employeeId),HttpStatus.OK);
    }
    @GetMapping ("${employeeManagement.priviousProject.getPriviousProjectByPriviousProjectId}")
    public ResponseEntity<PriviousProjectResponse> getpriviousProjectByPriviousProjectId(@PathVariable("priviousProjectId") Integer priviousProjectId)
    {
        return new ResponseEntity<>(priviousProjectServices.getPriviousProject(priviousProjectId),HttpStatus.OK);
    }
    @PostMapping("${employeeManagement.priviousProject.postPriviousProject}")
    public ResponseEntity<String> postPriviousProject(@RequestBody PriviousProjectResponse priviousProjectResponse)
    {
        return new ResponseEntity<>("This Privious project addedd successfully with Id: "+priviousProjectServices.postPriviousProject(priviousProjectResponse),HttpStatus.CREATED);
    }
    @DeleteMapping("${employeeManagement.priviousProject.deletePriviousProject}")
    public ResponseEntity<String> deletePriviousProject(@PathVariable("priviousProjectId") Integer priviousProjectId)
    {
        return new ResponseEntity<>("This privious year project successfully delete from database"+priviousProjectServices.deletePriviousProject(priviousProjectId),HttpStatus.OK);
    }
    @PutMapping("${employeeManagement.priviousProject.updatePriviousProject}")
    public ResponseEntity<String> updatePriviousProject(@RequestBody PriviousProjectResponse priviousProjectResponse)
    {
        return new ResponseEntity<>("The Privious project successfully updated with privious project Id"+priviousProjectServices.updatePriviousProject(priviousProjectResponse),HttpStatus.CREATED);
    }
}
