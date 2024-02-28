package com.employee_management_backend_Application.controller;

import com.employee_management_backend_Application.service.EmployeeDetailsRequest;
import com.employee_management_backend_Application.service.EmployeeDetailsResponse;
import com.employee_management_backend_Application.service.EmployeeDetailsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${employeeManagement.base.URL}")
@CrossOrigin
public class EmployeeDetailsController {
    /*employeeManagement.employeeDetails.getAllEmployeeDetails.URL=/getAllEmployeeDetails
employeeManagement.employeeDetails.getEmployeeDetails.URL=/getEmployeeDetails/{employeeDetailsId}
employeeManagement.employeeDetails.postEmployeeDetails.URL=/postEmployeeDetails
employeeManagement.employeeDetails.deleteEmployeeDetails.URL=/deleteEmployeeDetails/{employeeDetailsId}
employeeManagement.employeeDetails.updateEmployeeDetails.URl=/updateEmployeeDetails
*/
    @Autowired
    EmployeeDetailsServices employeeDetailsServices;
    @GetMapping("${employeeManagement.employeeDetails.getAllEmployeeDetails.URL}")
    public ResponseEntity<List<EmployeeDetailsResponse>> getAllEmployee(){
        return new ResponseEntity<>(employeeDetailsServices.getAllEmployeeDetails(), HttpStatus.OK);
    }
    @GetMapping("${employeeManagement.employeeDetails.getEmployeeDetails.URL}")
    public ResponseEntity<EmployeeDetailsResponse> getEmployeeDetails(@PathVariable("employeeDetailsId") Integer employeeDetailsId)
    {
//        System.out.println("everythig is fine+++++++++++++++");
        return new ResponseEntity<>(employeeDetailsServices.getEmployeeDeatils(employeeDetailsId),HttpStatus.OK);
    }
    @PostMapping("${employeeManagement.employeeDetails.postEmployeeDetails.URL}")
    public ResponseEntity<String> postEmployeeDetails(@RequestBody EmployeeDetailsRequest employeeDetailsRequest)
    {
        System.out.println(employeeDetailsRequest);

        return new ResponseEntity<>("Employee Details addedd successfully with employee Id:"+employeeDetailsServices.postEmployeeDetails(employeeDetailsRequest),HttpStatus.CREATED);
    }
    @DeleteMapping("${employeeManagement.employeeDetails.deleteEmployeeDetails.URL}")
    public ResponseEntity<String> deleteEmployeeDetails(@PathVariable("employeeDetailsId") Integer employeeDetailsId)
    {
        return new ResponseEntity<>("Employee Successfully deleted with employee Id: "+employeeDetailsServices.deleteEmployeeDetails(employeeDetailsId),HttpStatus.OK);
    }
    @PutMapping("${employeeManagement.employeeDetails.updateEmployeeDetails.URl}")
    public ResponseEntity<String> updateEmployeeDetails(@RequestBody EmployeeDetailsRequest employeeDetailsRequest)
    {
        return new ResponseEntity<>("employee successfully updated with employeeId:"+employeeDetailsServices.updateEmployeedetails(employeeDetailsRequest),HttpStatus.CREATED);
    }
}

