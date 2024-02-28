import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { employeeManagement_base_URL, employeeManagement_currentProject_deleteCurrentProject_URL, employeeManagement_currentProject_getAllCurrentProject_URL, employeeManagement_employeeDetails_getEmployeeDetails_URL } from '../../../public/ApiUrl';
import { Table, Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { Server_Error_Message } from '../../../public/UtilData';

function GetAllCurrentProject() {
    const navigate = useNavigate()
    const [allCuurentProjectData, setAllCurrentProjectData] = useState([])
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem('isLoggedIn') === 'false') {
            navigate('/login')
    }
  
    useEffect(() => {
        axios.get(employeeManagement_base_URL + employeeManagement_currentProject_getAllCurrentProject_URL)
            .then((response) => {
                setAllCurrentProjectData(response.data)
            })
            .catch((error) => {
                if(error.response.data.exceptionMessage==="No Current Project exits in database")
                {
                     toast.warning("No Any Current Project Exits")
                }
                else{
                    toast.warning(Server_Error_Message)
                }               
            })
    }, [])
    allCuurentProjectData
    ?.sort((project1, project2) => {
      if ((project2.employeeId - project1.employeeId) === 0)
        return project2.currentProjectId - project1.currentProjectId;
      else return project2.employeeId - project1.employeeId;
    })
    .reverse();
    
    const handleUpdate=(currentProject)=>{
        axios.get(employeeManagement_base_URL+employeeManagement_employeeDetails_getEmployeeDetails_URL+currentProject.employeeId)
        .then((data)=>{
          console.log(data.data)
         if(data.data.employeeEmail===sessionStorage.getItem("registrationEmail"))
         {
          navigate("/currentProjectDetails/getAllCurrentProjectDetails/updateCurrentProjectDetails",{state:currentProject})
         }
         else{
          toast.error("Unauthorized User For This Update ")
         }
        })
        .catch((error)=>{
          console.log(error)
          toast.error(Server_Error_Message)
        })
      }

      const handleDelete = (currentProject, event) => {
        event.preventDefault();
        if (!confirm("Are You!  Sure To Delete  This Project")) {
          return;
        }
        axios
          .get(
            employeeManagement_base_URL +
              employeeManagement_employeeDetails_getEmployeeDetails_URL +
            currentProject.employeeId
          )
          .then((data) => {
            if (
              data.data.employeeEmail ===
              sessionStorage.getItem("registrationEmail")
            ) {
                axios.delete(employeeManagement_base_URL + employeeManagement_currentProject_deleteCurrentProject_URL +currentProject. currentProjectId)
                .then(() => {
                    toast.success("Your Current Project Deleted Successfully With Current Project Id: " + currentProject.currentProjectId);
                    setAllCurrentProjectData(allCuurentProjectData.filter((currentProject1) => (currentProject1.currentProjectId !== currentProject.currentProjectId)))
                })
                .catch((error) => {
                    console.log(error.response.data)
                    toast.error(Server_Error_Message)

                })
        
            } else {
              toast.error("Unauthorized User To Delete This Current Project");
            }
          })
          .catch((error) => {
            toast.error(Server_Error_Message);
          });
      };
    return (
        <div style={{marginTop:'80px', height:'520px'}}>
            {allCuurentProjectData.length <= 0 ? <Alert style={{  marginTop:'80px', textAlign: 'center' }}>No Any Current Project  Exists</Alert> :
                <Container >
                    <Table striped bordered hover>
                        <thead style={{textAlign: 'center' }}>
                            <tr>
                                <th>Emp. Id </th>
                                <th>Project Id</th>
                                <th>Title</th>
                                <th>Objective</th>
                                <th>Description</th>
                                <th>Link</th>
                                <th>Delete </th>
                                <th>Update </th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCuurentProjectData.map((currentProject, index) => (
                                <tr key={index}>
                                    <td>{currentProject.employeeId}</td>
                                    <td>{currentProject.currentProjectId}</td>
                                    <td>{currentProject.currentProjectTitle}</td>
                                    <td>{currentProject.currentProjectObjective}</td>
                                    <td>{currentProject.currentProjectDescription}</td>
                                    <td>{currentProject.currentProjectLink ? <div style={{ marginLeft:'30px', backgroundColor: '#3377FF', height: '38px', paddingTop: '5px', width: '100px', borderRadius: '6px', color: 'white', fontWeight: 450 }}>{<Link style={{ fontSize: '18px', textDecoration: 'none', marginLeft: '10px', color: 'white', paddingTop: '30px' }} to={currentProject.currentProjectLink}>Click here</Link>}</div> : "In Dev Phase"}</td>
                                    <td>{<Button variant='danger' style={{ marginLeft:'30px', width: '100px' }} onClick={() => handleDelete(currentProject,event)}>Delete</Button>}</td>
                                    <td>{<Button style={{marginLeft:'30px', width: '100px' }} onClick={()=>handleUpdate(currentProject)} >Update</Button>}</td>
                                </tr>
                            ))}
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
                    <Row>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div></div></Col>
                        <Col><div><Button variant='danger' style={{ marginLeft: '-1200px', width: '100px', height: '40px', fontSize: '15px' }} onClick={() => { navigate(-1) }}>Cancel</Button></div></Col>
                    </Row>
                </Container>
            }
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default GetAllCurrentProject
