import * as Yup from 'yup';
export const UpdateCurrentProjectSchema=Yup.object({
   
    currentProjectTitle:Yup.string().matches(/[A-Z][a-z]+/,"In Valid Project  Name").required("Project  Name is required"),
    currentProjectDescription:Yup.string().required("Project description is required"),
    currentProjectObjective: Yup.string().required("Project Objective is required"),
    employeeId:Yup.number().required("Employee Id is reuired")

})
/**private Integer currentProjectId;
    private String currentProjectTitle;
    private String currentProjectLink;
    private String currentProjectDescription;
    private String currentProjectObjective;
    private Integer employeeId; */