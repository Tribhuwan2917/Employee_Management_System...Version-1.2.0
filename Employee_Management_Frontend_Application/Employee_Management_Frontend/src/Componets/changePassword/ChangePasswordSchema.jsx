import * as Yup from 'yup';
export const ChangePasswordSchema=Yup.object({
    newPassword:Yup.string().required("Password Is required"),
        confirmPassword:Yup.string().required("Conifrm Password is required").oneOf([Yup.ref('newPassword'),null],"Password and Confirm Password Should be same")
})