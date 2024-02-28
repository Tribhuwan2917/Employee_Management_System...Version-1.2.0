import * as Yup from 'yup';
export const ForgotPasswordSchema=Yup.object({
    registrationEmail:Yup.string().email("Invalid Employee Email Id").required("Employee Email is reuired")
})