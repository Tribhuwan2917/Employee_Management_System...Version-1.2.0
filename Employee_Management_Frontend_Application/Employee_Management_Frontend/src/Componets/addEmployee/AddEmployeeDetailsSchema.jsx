import * as Yup from 'yup';
const digitsOnly = (value) => /^\d+$/.test(value)
export const AddEmployeeDetailsSchema=Yup.object({
    employeeId:Yup.number().required("Employee Id is reuired"),
    employeeFirstName:Yup.string().matches(/[A-Z][a-z]+/,"Invalid Employee First Name").required("Employee First Name is required"),
    employeeLastName:Yup.string().matches(/[A-Z][a-z]+/,"Invalid Employee Last Name").required("Employee Last Name is required"),
    // employeeEmail:Yup.string().email("InValid Email Id: ").required("Employee email is required"),
    employeeDesignation: Yup.string().required("Employee Zip is required"),
    employeeAddressCity:Yup.string().matches(/[A-Z][a-z]+/,"Invalid Employee Address City").required("Employee city is required"),
    employeeSalaryPerMonth:Yup.number().required("Employee Salary is required"),
    employeeGender:Yup.string().required("Employee Gender is required"),
    employeeCountry:Yup.string().required("Employee Country Is required"),
    employeeMobileNo:Yup.string().required("Employee Number Is Required").test('len', 'In valid Mobile Number', val => val.length === 10).test('Digits only', 'In valid Mobile Number', digitsOnly)

})

/**  private Integer employeeId;
    private String employeeFirstName;
    private String employeeLastName;
    private String employeeEmail;
    private String employeeCountry;
    private String employeeAddressZipCode;
    private String employeeAddressCity; */