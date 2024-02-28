import * as Yup from 'yup';
export const UpdatePriviousProjectSchema=Yup.object({
   
    priviousProjectTitle:Yup.string().matches(/[A-Z][a-z]+/,"In Valid Project Title").required("EProject Title is required is required"),
    priviousProjectDescription:Yup.string().required("Project Description is required"),
    priviousProjectObjective: Yup.string().required("Project Objective is required"),
    employeeId:Yup.number().required("Project Employee Id is reuired")

})
/*
private Integer priviousProjectId;
private String priviousProjectTitle;
private String priviousProjectLink;
private String priviousProjectDescription;
private String priviousProjectObjective;
private Integer employeeId; */