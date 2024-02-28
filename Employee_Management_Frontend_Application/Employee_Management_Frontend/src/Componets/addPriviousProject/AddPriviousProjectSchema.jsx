import * as Yup from 'yup';
export const AddPriviousProjectSchema=Yup.object({

    priviousProjectId:Yup.number().required("Current Project Id is required"),
    priviousProjectTitle:Yup.string().required(" Current Project Title is required"),
    priviousProjectLink:Yup.string(),
    priviousProjectDescription: Yup.string().required("Current Project Description is required"),
    priviousProjectObjective:Yup.string().required("Current Project Objective is required"),
    employeeId:Yup.number().required("Employee Id is reuired")

})
/**private Integer priviousProjectId;
    private String priviousProjectTitle;
    private String priviousProjectLink;
    private String priviousProjectDescription;
    private String priviousProjectObjective;
    private Integer employeeId; */