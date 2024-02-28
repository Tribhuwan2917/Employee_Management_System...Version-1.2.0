import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import {
  employeeManagement_base_URL,
  employeeManagement_employeeDetails_getEmployeeDetails_URL,
  employeeManagement_priviousProject_deletePriviousProject,
  employeeManagement_priviousProject_getAllPriviousProject_URL,
} from "../../../public/ApiUrl";
import { Table, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Server_Error_Message } from "../../../public/UtilData";

function GetAllPrivousProject() {
  const navigate = useNavigate();
  const [allProjectPriviousData, setAllPriviousProjectData] = useState([]);

  useEffect(() => {
    if (
      !sessionStorage.getItem("isLoggedIn") ||
      sessionStorage.getItem("isLoggedIn") === "false"
    ) {
      navigate("/login");
    }
    axios
      .get(
        employeeManagement_base_URL +
          employeeManagement_priviousProject_getAllPriviousProject_URL
      )
      .then((response) => {
        setAllPriviousProjectData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  allProjectPriviousData
    ?.sort((project1, project2) => {
      if (project2.employeeId - project1.employeeId === 0)
        return project2.priviousProjectId - project1.priviousProjectId;
      else return project2.employeeId - project1.employeeId;
    })
    .reverse();
  const handleUpdate = (priviousProject) => {
    axios
      .get(
        employeeManagement_base_URL +
          employeeManagement_employeeDetails_getEmployeeDetails_URL +
          priviousProject.employeeId
      )
      .then((data) => {
        console.log(data.data);
        if (
          data.data.employeeEmail ===
          sessionStorage.getItem("registrationEmail")
        ) {
          navigate("/priviousProjectDetails/updatePriviousProjectDetails", {
            state: priviousProject,
          });
        } else {
          toast.error("Unauthorized Employee To Update This  Project ");
        }
      })
      .catch((error) => {
        toast.error("Oops! Something Went Wrong, Please Try After Some Time");
      });
  };
  const handleDelete = (priviousProject, event) => {
    event.preventDefault();
    if (!confirm("Are You!  Sure To delete the This project")) {
      return;
    }
    axios
      .get(
        employeeManagement_base_URL +
          employeeManagement_employeeDetails_getEmployeeDetails_URL +
          priviousProject.employeeId
      )
      .then((data) => {
        if (
          data.data.employeeEmail ===
          sessionStorage.getItem("registrationEmail")
        ) {
          axios
            .delete(
              employeeManagement_base_URL +
                employeeManagement_priviousProject_deletePriviousProject +
                priviousProject.priviousProjectId
            )
            .then(() => {
              toast.success(
                "Current Project Deleted Successfully! with Current Project  Id: " +
                  priviousProject.priviousProjectId
              );
              setAllPriviousProjectData(
                allProjectPriviousData?.filter(
                  (priviousProject1) =>
                    priviousProject1.priviousProjectId !==
                    priviousProject.priviousProjectId
                )
              );
            })
            .catch((error) => {
              if (
                error.response.data.exceptionMessage ===
                "Privious Project Not Found for Employee Id: " +
                  allProjectPriviousData.employeeId
              ) {
                toast.warning(
                  "No Any Privious Project for Employee Id: " +
                    allProjectPriviousData?.employeeId
                );
              } else {
                toast.error(Server_Error_Message);
              }
              setAllPriviousProjectData([]);
            });
        } else {
          toast.error("Unauthorized User To Delete This Current Project");
        }
      })
      .catch((error) => {
        toast.error(Server_Error_Message);
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
      {allProjectPriviousData?.length <= 0 ? (
        <span style={{ width: "100%", marginTop: "180px", color: "black" }}>
          NO Any Privious Project Exists
        </span>
      ) : (
        <Card style={{ marginTop: "80px" }}>
          <Card.Body>
            <Card.Title>Employee Privious Projects</Card.Title>
            <Card.Text>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Emp. Id</th>
                    <th>Project Id</th>
                    <th> Title</th>
                    <th>Objective</th>
                    <th> Description</th>
                    <th>Project Link</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allProjectPriviousData?.map((priviousProject, index) => (
                    <tr key={index}>
                      <td>{priviousProject?.employeeId}</td>
                      <td>{priviousProject?.priviousProjectId}</td>
                      <td>{priviousProject?.priviousProjectTitle}</td>
                      <td>{priviousProject?.priviousProjectObjective}</td>
                      <td>{priviousProject?.priviousProjectDescription}</td>
                      <td>
                        {priviousProject?.priviousProjectLink ? (
                          <Button href={priviousProject.priviousProjectLink}
                          >
                            Click here
                          </Button>
                        ) : (
                          "In Dev Phase"
                        )}
                      </td>
                      <td>
                        <Button
                          style={{ margin: "0px", blockSize: "100%" }}
                          onClick={() => handleUpdate(priviousProject, event)}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(priviousProject, event)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Text>
            <Button
              style={{ marginLeft: "-1200px", width: "100px" }}
              onClick={() => {
                navigate(-1);
              }}
              variant="danger"
            >
              Cancel
            </Button>
          </Card.Body>
        </Card>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default GetAllPrivousProject;
