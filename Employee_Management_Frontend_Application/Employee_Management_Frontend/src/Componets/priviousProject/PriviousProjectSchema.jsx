import * as Yup from 'yup';
export const PriviousProjectSchema=Yup.object({
    employeeId:Yup.number().required("Employee Id is reuired").min(0,"Employee Id Can't be negative")
})