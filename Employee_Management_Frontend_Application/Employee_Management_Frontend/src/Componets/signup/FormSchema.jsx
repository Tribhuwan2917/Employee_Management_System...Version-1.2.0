import * as Yup from 'yup';
export const FormSchema=Yup.object({
    registrationEmail:Yup.string().email("Invalid Employee Email Id:").required("Employee Email is reuired"),
    registraionPassword:Yup.string().matches(/[A-Za-z0-9]+[!@#$%^&*()_+]+/,"Passwrod is too week").min(5,"passwrod is too Sort").required("Employee passwrod is required"),
    registraionConfirmPassword:Yup.string().required("Conifrm Password is required").oneOf([Yup.ref('registraionPassword'),null],"Password and Confirm Password Should be same")
})