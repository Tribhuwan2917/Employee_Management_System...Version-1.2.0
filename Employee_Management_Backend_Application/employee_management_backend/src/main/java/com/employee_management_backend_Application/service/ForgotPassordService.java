package com.employee_management_backend_Application.service;

import java.io.IOException;

public interface ForgotPassordService {
    public ForgotPasswordResponse forgotPosswordOtpVerification(ForgotPasswordRequest forgotPasswordRequest)throws IOException;
}
