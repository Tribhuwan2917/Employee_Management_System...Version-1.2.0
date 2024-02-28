import * as Yup from 'yup';
export const AddCurrentProjectSchema=Yup.object({

    currentProjectId:Yup.number().required("Current Project Id is required"),
    currentProjectTitle:Yup.string().required(" Current Project Title is required"),
    currentProjectLink:Yup.string(),
    currentProjectDescription: Yup.string().required("Current Project Description is required"),
    currentProjectObjective:Yup.string().required("Current Project Objective is required"),
    employeeId:Yup.number().required("Employee Id is reuired")

})
/**private Integer currentProjectId;
    private String currentProjectTitle;
    private String currentProjectLink;
    private String currentProjectDescription;
    private String currentProjectObjective;
    private Integer employeeId; */