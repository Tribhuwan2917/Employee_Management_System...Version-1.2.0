package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.entity.PriviousProject;
import com.employee_management_backend_Application.exception.PriviousProjectAlreadyExistsException;
import com.employee_management_backend_Application.exception.PriviousProjectNotFoundException;
import com.employee_management_backend_Application.repository.EmployeeDetailsRepository;
import com.employee_management_backend_Application.repository.PriviousProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PriviousProjectServicesImpl implements PriviousProjectServices{
    @Autowired
    private PriviousProjectRepository priviousProjectRepository;
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;
    @Override
    public List<PriviousProjectResponse> getAllPriviousProject() {
        List<PriviousProject> priviousProjectList=priviousProjectRepository.findAll();
        System.out.println(priviousProjectList);
        if (priviousProjectList.isEmpty())
        {
            throw new PriviousProjectNotFoundException("No any Privious project exists in database");
        }
        else {
            List<PriviousProjectResponse> priviousProjectResponseList=new ArrayList<>();
            for(PriviousProject priviousProject:priviousProjectList)
            {
                PriviousProjectResponse priviousProjectResponse=new PriviousProjectResponse();
                priviousProjectResponse.setPriviousProjectId(priviousProject.getPriviousProjectId());
                priviousProjectResponse.setPriviousProjectLink(priviousProject.getPriviousProjectLink());
                priviousProjectResponse.setPriviousProjectDescription(priviousProject.getPriviousProjectDescription());
                priviousProjectResponse.setPriviousProjectObjective(priviousProject.getPriviousProjectObjective());
                priviousProjectResponse.setPriviousProjectTitle(priviousProject.getPriviousProjectTitle());
                priviousProjectResponse.setEmployeeId(priviousProject.getEmployeeId());
                priviousProjectResponseList.add(priviousProjectResponse);
            }
            System.out.println(priviousProjectResponseList);
            return priviousProjectResponseList;
        }
    }

    @Override
    public PriviousProjectResponse getPriviousProject(Integer priviousProjectId) {
        Optional<PriviousProject> optionalPriviousProject=priviousProjectRepository.findById(priviousProjectId);
        if (optionalPriviousProject.isPresent())
        {
            PriviousProject priviousProject=optionalPriviousProject.get();
            PriviousProjectResponse priviousProjectResponse=new PriviousProjectResponse();
            priviousProjectResponse.setEmployeeId(priviousProject.getEmployeeId());
            priviousProjectResponse.setPriviousProjectId(priviousProject.getPriviousProjectId());
            priviousProjectResponse.setPriviousProjectLink(priviousProject.getPriviousProjectLink());
            priviousProjectResponse.setPriviousProjectDescription(priviousProject.getPriviousProjectDescription());
            priviousProjectResponse.setPriviousProjectObjective(priviousProject.getPriviousProjectObjective());
            priviousProjectResponse.setPriviousProjectTitle(priviousProject.getPriviousProjectTitle());
            return priviousProjectResponse;
        }
        else {
            throw new PriviousProjectNotFoundException("No any Privious Project exists in database with Id: "+priviousProjectId);
        }
    }

    @Override
    public Integer postPriviousProject(PriviousProjectResponse priviousProjectResponse) {
        if (priviousProjectRepository.existsById(priviousProjectResponse.getPriviousProjectId()))
        {
            throw new PriviousProjectAlreadyExistsException("This Privious  project Already exists in database with Id: "+priviousProjectResponse.getPriviousProjectId());
        }
        else {
            if(employeeDetailsRepository.existsById(priviousProjectResponse.getEmployeeId())) {
                PriviousProject priviousProject = new PriviousProject();
                priviousProject.setPriviousProjectLink(priviousProjectResponse.getPriviousProjectLink());
                priviousProject.setPriviousProjectId(priviousProjectResponse.getPriviousProjectId());
                priviousProject.setPriviousProjectTitle(priviousProjectResponse.getPriviousProjectTitle());
                priviousProject.setPriviousProjectObjective(priviousProjectResponse.getPriviousProjectObjective());
                priviousProject.setPriviousProjectDescription(priviousProjectResponse.getPriviousProjectDescription());
                priviousProject.setEmployeeId(priviousProjectResponse.getEmployeeId());
                return priviousProjectRepository.save(priviousProject).getPriviousProjectId();
            }
            else {
                throw new PriviousProjectNotFoundException("No Employee Exists Coressponding this project That's why we can not add this privious project");
            }

        }
    }

    @Override
    public Integer deletePriviousProject(Integer priviousProjectId) {
        if (priviousProjectRepository.existsById(priviousProjectId))
        {
            priviousProjectRepository.deleteById(priviousProjectId);
            return priviousProjectId;
        }
        else {
            throw new PriviousProjectNotFoundException("Privious Project Not Found with Id "+priviousProjectId);
        }
    }

    @Override
    public Integer updatePriviousProject(PriviousProjectResponse priviousProjectResponse) {
        if(priviousProjectRepository.existsById(priviousProjectResponse.getPriviousProjectId()))
        {
            if(employeeDetailsRepository.existsById(priviousProjectResponse.getEmployeeId())) {
                PriviousProject priviousProject = new PriviousProject();
                priviousProject.setPriviousProjectLink(priviousProjectResponse.getPriviousProjectLink());
                priviousProject.setPriviousProjectId(priviousProjectResponse.getPriviousProjectId());
                priviousProject.setPriviousProjectTitle(priviousProjectResponse.getPriviousProjectTitle());
                priviousProject.setPriviousProjectObjective(priviousProjectResponse.getPriviousProjectObjective());
                priviousProject.setPriviousProjectDescription(priviousProjectResponse.getPriviousProjectDescription());
                priviousProject.setEmployeeId(priviousProjectResponse.getEmployeeId());
                return priviousProjectRepository.save(priviousProject).getPriviousProjectId();
            }
            else {
                throw new PriviousProjectNotFoundException("No Any Employee Exists Coresponding This Privious Project Id: "+priviousProjectResponse.getPriviousProjectId());
            }
        }
        else {
            throw new PriviousProjectNotFoundException("No Any Privious Project Found");
        }
    }

    @Override
    public List<PriviousProjectResponse> getPriviousProjectByEmployeeId(Integer employeeId) {
        List<PriviousProject> priviousProjectList=priviousProjectRepository.findPriviousProjectByEmployeeId(employeeId);
        if(priviousProjectList.isEmpty())
        {
            throw new PriviousProjectNotFoundException("Privious Project Not Found for Employee Id: "+employeeId);
        }
        else {
            List<PriviousProjectResponse> priviousProjectResponseList=new ArrayList<>();
            for (PriviousProject priviousProject:priviousProjectList)
            {
                PriviousProjectResponse priviousProjectResponse=new PriviousProjectResponse();
                priviousProjectResponse.setEmployeeId(priviousProject.getEmployeeId());
                priviousProjectResponse.setPriviousProjectLink(priviousProject.getPriviousProjectLink());
                priviousProjectResponse.setPriviousProjectTitle(priviousProject.getPriviousProjectTitle());
                priviousProjectResponse.setPriviousProjectId(priviousProject.getPriviousProjectId());
                priviousProjectResponse.setPriviousProjectObjective(priviousProject.getPriviousProjectObjective());
                priviousProjectResponse.setPriviousProjectDescription(priviousProject.getPriviousProjectDescription());
                priviousProjectResponseList.add(priviousProjectResponse);
            }
            return priviousProjectResponseList;
        }
    }
}
