package com.employee_management_backend_Application.service;

import com.employee_management_backend_Application.entity.Registration;
import com.employee_management_backend_Application.exception.RegistrationAlreadyExistException;
import com.employee_management_backend_Application.exception.RegistrationNotFoundException;
import com.employee_management_backend_Application.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RegistrationServicesImpl implements EmployeeRegistrationService {
    @Autowired
    private RegistrationRepository registrationRepository;

    @Override
    public List<RegisterResponse> getAllRegistration() {
        List<Registration> registrationList=registrationRepository.findAll();
        if(registrationList.isEmpty())
        {
            throw new RegistrationNotFoundException(" No Registration present database");
        }
        else {
            List<RegisterResponse> registerResponseList=new ArrayList<>();
            for (Registration registration:registrationList)
            {
                RegisterResponse registerResponse=new RegisterResponse();
                registerResponse.setRegistrationEmail(registration.getRegistrationEmail());
                registerResponse.setRegistraionPassword(registration.getRegistraionPassword());
                registerResponseList.add(registerResponse);
            }
            return registerResponseList;
        }
    }

    @Override
    public RegisterResponse getRegisterResponse(String registerEmail) {
        System.out.println("It has been called");
        Optional<Registration> optionalRegister=registrationRepository.findById(registerEmail);
        if(optionalRegister.isPresent())
        {
            Registration register=optionalRegister.get();
            RegisterResponse registerResponse=new RegisterResponse();
            registerResponse.setRegistrationEmail(register.getRegistrationEmail());
            registerResponse.setRegistraionPassword(register.getRegistraionPassword());
            return registerResponse;
        }
        else {
            throw new RegistrationNotFoundException("Registration With Email Id: "+registerEmail+"Not Found");
        }
    }

    @Override
    public String postRegisterResponse(RegisterResponse registerResponse) {

        if(registrationRepository.existsById(registerResponse.getRegistrationEmail()))
        {
            System.out.println("It has been called");
            throw new RegistrationAlreadyExistException("Registration with Email Id: "+registerResponse.getRegistrationEmail()+"already exists");
        }
        else {
            Registration registration=new Registration();
            registration.setRegistrationEmail(registerResponse.getRegistrationEmail());
            registration.setRegistraionPassword(registerResponse.getRegistraionPassword());
            registrationRepository.save(registration);
            return registerResponse.getRegistrationEmail();
        }
    }

    @Override
    public String updateRegisterResponse(RegisterResponse registerResponse) {
        if (registrationRepository.existsById(registerResponse.getRegistrationEmail()))
        {
            Registration registration=new Registration();
            registration.setRegistrationEmail(registerResponse.getRegistrationEmail());
            registration.setRegistraionPassword(registerResponse.getRegistraionPassword());
            registrationRepository.save(registration);
            return registerResponse.getRegistrationEmail();

        }
        else {
            throw new RegistrationNotFoundException("Registration with Email Id: "+registerResponse.getRegistrationEmail()+" does not exists ");
        }

    }

    @Override
    public String deleteRegisterResponse(String registerEmail) {
        if(registrationRepository.existsById(registerEmail))
        {
            registrationRepository.deleteById(registerEmail);
            return registerEmail;
        }
        else {
            throw new RegistrationNotFoundException("Registration with Email Id: "+registerEmail+" does not exist");
        }
    }
}
