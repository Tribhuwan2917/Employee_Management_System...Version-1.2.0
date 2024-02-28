package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.entity.CurrentProject;
import com.employee_management_backend_Application.entity.PriviousProject;
import com.employee_management_backend_Application.exception.CurrentProjectAlreadyExistsException;
import com.employee_management_backend_Application.exception.CurrentProjectNotFoundException;
import com.employee_management_backend_Application.exception.EmployeeDetailsNotFoundException;
import com.employee_management_backend_Application.repository.CurrentProjectRepository;
import com.employee_management_backend_Application.repository.EmployeeDetailsRepository;
import com.employee_management_backend_Application.repository.PriviousProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeCurrentProjectServicesImpl implements EmployeeCurrentProjectServices{
    @Autowired
    private CurrentProjectRepository currentProjectRepository;
    @Autowired
    private PriviousProjectRepository priviousProjectRepository;
    @Autowired
    private EmployeeDetailsRepository employeeDetailsRepository;
    @Override
    public CurrentProjectResponse getCurrentProjectByEmployeeId(Integer employeeId) {
        Optional<CurrentProject> optionalCurrentProject=currentProjectRepository.getCurrentProjectByEmployeeId(employeeId);
        if(optionalCurrentProject.isPresent())
        {
            CurrentProject currentProject=optionalCurrentProject.get();
            CurrentProjectResponse currentProjectResponse=new CurrentProjectResponse();
            currentProjectResponse.setEmployeeId(currentProject.getEmployeeId());
            currentProjectResponse.setCurrentProjectId(currentProject.getCurrentProjectId());
            currentProjectResponse.setCurrentProjectDescription(currentProject.getCurrentProjectDescription());
            currentProjectResponse.setCurrentProjectLink(currentProject.getCurrentProjectLink());
            currentProjectResponse.setCurrentProjectObjective(currentProject.getCurrentProjectObjective());
            currentProjectResponse.setCurrentProjectTitle(currentProject.getCurrentProjectTitle());
            return currentProjectResponse;
        }
        else {
            throw new CurrentProjectNotFoundException("No Any Current project present databse for employee Id: "+employeeId);
        }
    }

    @Override
    public CurrentProjectResponse getCurrentProject() {
        List<CurrentProject> currentProjectList =currentProjectRepository.findAll();
        if(currentProjectList.isEmpty())
        {
            throw new CurrentProjectNotFoundException("No any Current project present database");
        }
        else {
            CurrentProject currentProject=currentProjectList.get(0);
            CurrentProjectResponse currentProjectResponse=new CurrentProjectResponse();
            currentProjectResponse.setEmployeeId(currentProject.getEmployeeId());
            currentProjectResponse.setCurrentProjectId(currentProject.getCurrentProjectId());
            currentProjectResponse.setCurrentProjectDescription(currentProject.getCurrentProjectDescription());
            currentProjectResponse.setCurrentProjectLink(currentProject.getCurrentProjectLink());
            currentProjectResponse.setCurrentProjectObjective(currentProject.getCurrentProjectObjective());
            currentProjectResponse.setCurrentProjectTitle(currentProject.getCurrentProjectTitle());
            return currentProjectResponse;
        }
    }

    @Override
    public Integer addCurrentProject(CurrentProjectResponse currentProjectResponse) {
        if (currentProjectRepository.existsById(currentProjectResponse.getCurrentProjectId()))
        {
            throw new CurrentProjectAlreadyExistsException("This Current project Already present in database with current Project Id"+currentProjectResponse.getCurrentProjectId());
        }
        else {
            if(!employeeDetailsRepository.existsById(currentProjectResponse.getEmployeeId()))
            {
                throw new CurrentProjectNotFoundException(" No Employee Exists Coressponding this current project so that we can not add it ");
            }
            CurrentProject currentProject=new CurrentProject();
            currentProject.setCurrentProjectDescription(currentProjectResponse.getCurrentProjectDescription());
            currentProject.setEmployeeId(currentProjectResponse.getEmployeeId());
            currentProject.setCurrentProjectTitle(currentProjectResponse.getCurrentProjectTitle());
            currentProject.setCurrentProjectObjective(currentProjectResponse.getCurrentProjectObjective());
            currentProject.setCurrentProjectLink(currentProjectResponse.getCurrentProjectLink());
            currentProject.setCurrentProjectId(currentProjectResponse.getCurrentProjectId());
            if(currentProjectRepository.getCurrentProjectByEmployeeId(currentProjectResponse.getEmployeeId()).isPresent()){
                CurrentProject currentProjectdb=currentProjectRepository.getCurrentProjectByEmployeeId(currentProjectResponse.getEmployeeId()).get();
                PriviousProject priviousProject=new PriviousProject();
                priviousProject.setPriviousProjectTitle(currentProjectdb.getCurrentProjectTitle());
                priviousProject.setPriviousProjectId(currentProjectdb.getCurrentProjectId());
                priviousProject.setPriviousProjectObjective(currentProjectdb.getCurrentProjectObjective());
                priviousProject.setPriviousProjectLink(currentProjectdb.getCurrentProjectLink());
                priviousProject.setPriviousProjectDescription(currentProjectdb.getCurrentProjectDescription());
                priviousProject.setEmployeeId(currentProjectdb.getEmployeeId());
                currentProjectRepository.deleteCurrentProjectByEmployeeId(currentProjectdb.getEmployeeId());
                priviousProjectRepository.save(priviousProject);
                currentProjectRepository.save(currentProject);
                return currentProjectResponse.getCurrentProjectId();
            }
            else {
                return currentProjectRepository.save(currentProject).getCurrentProjectId();


            }

        }
    }

    @Override
    public Integer deleteCurrentProject(Integer currentProjectId) {
        if (currentProjectRepository.existsById(currentProjectId))
        {
            currentProjectRepository.deleteById(currentProjectId);
            return currentProjectId;
        }
        else {
            throw new CurrentProjectNotFoundException("Current Project Not not exists With currentProjectId: "+currentProjectId);
        }
    }

    @Override
    public Integer updateCurrentProject(CurrentProjectResponse currentProjectResponse) {
      if (currentProjectRepository.existsById(currentProjectResponse.getCurrentProjectId()))
      {
          if(employeeDetailsRepository.existsById(currentProjectResponse.getEmployeeId())) {
              CurrentProject currentProject = new CurrentProject();
              currentProject.setCurrentProjectDescription(currentProjectResponse.getCurrentProjectDescription());
              currentProject.setEmployeeId(currentProjectResponse.getEmployeeId());
              currentProject.setCurrentProjectTitle(currentProjectResponse.getCurrentProjectTitle());
              currentProject.setCurrentProjectObjective(currentProjectResponse.getCurrentProjectObjective());
              currentProject.setCurrentProjectLink(currentProjectResponse.getCurrentProjectLink());
              currentProject.setCurrentProjectId(currentProjectResponse.getCurrentProjectId());
              currentProjectRepository.save(currentProject);
              return currentProjectResponse.getCurrentProjectId();
          }
          else {
              throw new EmployeeDetailsNotFoundException("No Employee Found With This Employee Id: "+currentProjectResponse.getEmployeeId());
          }
      }
      else
      {
          throw new CurrentProjectNotFoundException("Current Project Not not exists With currentProjectId: "+currentProjectResponse.getCurrentProjectId());

      }
    }

    @Override
    public List<CurrentProjectResponse> getAllCurrentProject() {
        List<CurrentProject> currentProjectList=currentProjectRepository.findAll();
        if(currentProjectList.isEmpty())
        {
            throw new CurrentProjectNotFoundException("No Current Project exits in database");
        }
        else {
            List<CurrentProjectResponse> currentProjectResponseList=new ArrayList<>();
            for(CurrentProject currentProject:currentProjectList)
            {
                CurrentProjectResponse currentProjectResponse=new CurrentProjectResponse();
                currentProjectResponse.setEmployeeId(currentProject.getEmployeeId());
                currentProjectResponse.setCurrentProjectId(currentProject.getCurrentProjectId());
                currentProjectResponse.setCurrentProjectDescription(currentProject.getCurrentProjectDescription());
                currentProjectResponse.setCurrentProjectLink(currentProject.getCurrentProjectLink());
                currentProjectResponse.setCurrentProjectObjective(currentProject.getCurrentProjectObjective());
                currentProjectResponse.setCurrentProjectTitle(currentProject.getCurrentProjectTitle());
                currentProjectResponseList.add(currentProjectResponse);
            }
            return currentProjectResponseList;
        }

    }
}
