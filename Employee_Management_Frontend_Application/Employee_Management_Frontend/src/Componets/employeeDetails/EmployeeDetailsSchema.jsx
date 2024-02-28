import * as Yup from 'yup';
export const EmployeeDetailsSchema=Yup.object({
    employeeId:Yup.number().required("Employee Id is reuired").min(0,"Employee Id Can't be negative")
})