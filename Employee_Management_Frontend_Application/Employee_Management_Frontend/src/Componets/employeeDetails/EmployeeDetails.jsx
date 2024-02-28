import  {  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Table, Alert } from 'react-bootstrap'
import { useFormik } from 'formik';
import { EmployeeDetailsSchema } from './EmployeeDetailsSchema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { employeeManagement_base_URL, employeeManagement_employeeDetails_deleteEmployeeDetails_URL, employeeManagement_employeeDetails_getEmployeeDetails_URL } from '../../../public/ApiUrl';
import { Server_Error_Message } from '../../../public/UtilData';

function EmployeeDetails() {
    const navigate = useNavigate();
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
       navigate("/login") 
    }
    console.log(sessionStorage)
    const inputSearchIntialValue = {
        employeeId: ''
    }
    const { handleChange, handleBlur, handleSubmit, touched, errors, values } = useFormik({
        initialValues: inputSearchIntialValue,
        onSubmit: (values, action) => {
            console.log(values)
            axios.get(employeeManagement_base_URL + employeeManagement_employeeDetails_getEmployeeDetails_URL + values.employeeId).then((response) => {
                setEmployeeData(response.data)
                // console.log(response.data)
                action.resetForm()
            }).catch(() => {
                toast.warning("No Employee Exists With Employee Id: " + values.employeeId)
                setEmployeeData({})
            })
        },
        validationSchema: EmployeeDetailsSchema
    })
    const [employeeData, setEmployeeData] = useState({

        employeeId: '',
        employeeFirstName: '',
        employeeLastName: '',
        employeeEmail: '',
        employeeCountry: '',
        employeeDesignation: '',
        employeeAddressCity: '',
        employeeSalaryPerMonth: '',
        employeeGender: '',
        employeeImageUrl:'',
        employeeMobileNo:''
    })
    const handleUpdate = (employeeData) => {
        axios
          .get(
            employeeManagement_base_URL +
              employeeManagement_employeeDetails_getEmployeeDetails_URL +
              employeeData.employeeId
          )
          .then((data) => {
            if (
              data.data.employeeEmail ===
              sessionStorage.getItem("registrationEmail")
            ) {
               navigate('/employeeDetails/updateEmployeeDetails', { state: { employeeData } });
            } else {
              toast.error("Unauthorized User For This Update ");
            }
          })
          .catch((error) => {
            toast.error("Oops! Something Went Wrong, Please Try After Some Time");
          });
      };
      const handleDelete = (employeeId, event) => {
        event.preventDefault();
        if (!confirm("Are You!  Sure To Delete  This Employee Data")) {
          return;
        }
        axios
          .get(
            employeeManagement_base_URL +
              employeeManagement_employeeDetails_getEmployeeDetails_URL +
              employeeId
          )
          .then((data) => {
            if (
              data.data.employeeEmail ===
              sessionStorage.getItem("registrationEmail")
            ) {
                axios.delete(employeeManagement_base_URL + employeeManagement_employeeDetails_deleteEmployeeDetails_URL + employeeId)
                .then(() => {
                    toast.success("Employee Deleted Successfully! with Employee Id: " + employeeData.employeeId);
                    setEmployeeData({})
                }).catch(() => {
                    toast.error(Server_Error_Message);
                })
            } else {
              toast.error("Unauthorized User To Delete This Employee Data");
            }
          })
          .catch((error) => {
            console.log(error)
            toast.error(Server_Error_Message);
          });
      };
    const handleCancel = (event) => {
        event.preventDefault();
        setEmployeeData({})
    }
    return (
        <div style={{
            marginTop: "85px",
            textAlign: "center",
            width: "70rem",
            height: "30rem",
            marginLeft:'38px'
          }}>
            <Card
              style={{ textAlign: 'center', width: '80rem', height: '30rem' }}
             >
                {/* <Card.Img  src={Employee_Image_URL}  variant="top" height='200px' /> */}
                <Card.Body>
                    <Card.Title>Employee Details</Card.Title>
                   
                    <Card.Text>
                        <Container fluid>
                            <Row>
                                <Col lg={6}>
                                    <Form onSubmit={handleSubmit}>
                                        <span >
                                            <input value={values.employeeId} onBlur={handleBlur} name='employeeId' onChange={handleChange} type='number' placeholder='Search Employee By Employee Id' style={{  width: '400px', height: '40px', borderRadius: '10px'}}></input>
                                           
                                            <Button style={{ marginLeft: '5px', marginBottom: '10px' }} disabled={false} type='submit'>Search</Button>
                                            {errors.employeeId && touched.employeeId ? <Alert style={{ marginLeft: '60px', width: '400px'
                          , height: '30px', paddingBottom: '30px'}} variant='danger'>
                                                {errors.employeeId}
                                            </Alert> : null}
                                        </span>
                                    </Form>
                                </Col>
                                <Col>
                                    <Button onClick={() => { navigate("/employeeDetails/addEmployee") }}>Add Employee</Button>
                                </Col>
                                <Col>
                                    <Button onClick={() => { navigate('/employeeDetails/getAllEmployee' ) }}>Get All Employee</Button>
                                </Col>
                            </Row>
                        </Container>{

                            (!employeeData.employeeId) ? null :
                                <Container>
                                    <Row>
                                        <Table striped bordered hover>
                                            <thead>
                                                <tr>
                                                <th>Profile</th>
                                                    <th>Emp.Id</th>
                                                    <th> First Name</th>
                                                    <th> Last Name</th>
                                                    <th> Email Id </th>
                                                    <th>Mobile No</th>
                                                    <th>Country</th>
                                                    <th>Designation</th>
                                                    <th>City</th>
                                                    <th>Salary/Month</th>
                                                    <th>Current Project Id</th>
                                                    <th>Delete</th>
                                                    <th>Update </th>
                                                </tr>
                                            </thead>s
                                            <tbody>
                                                <tr>
                                                    <td><img src={employeeData.employeeImageUrl} height={70} width={70} style={{borderRadius:'50%'}}></img></td>
                                                    <td>{employeeData.employeeId}</td>
                                                    <td> {employeeData.employeeFirstName}</td>
                                                    <td>{employeeData.employeeLastName}</td>
                                                    <td>{employeeData.employeeEmail} </td>
                                                    <td>{employeeData.employeeMobileNo}</td>
                                                    <td>{employeeData.employeeCountry}</td>
                                                    <td>{employeeData.employeeDesignation}</td>
                                                    <td>{employeeData.employeeAddressCity}</td>
                                                    <td>{employeeData.employeeSalaryPerMonth}</td>
                                                    <td>{employeeData.employeeCurrentProjectId === null ? "NA" : employeeData.employeeCurrentProjectId}</td>
                                                    <td><Button style={{ backgroundColor:'red',marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={()=>handleDelete(employeeData.employeeId,event)}>Delete</Button></td>
                                                    <td><Button style={{ marginLeft: '5px', width: '100px', height: '40px', fontSize: '15px' }} onClick={()=>handleUpdate(employeeData)}>Update</Button></td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Row>
                                    <Row>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div></div></Col>
                                        <Col><div><Button style={{backgroundColor:'red', width:'120px',height:'40px',marginLeft:'15px'}}Button onClick={handleCancel}>Cancel</Button></div></Col>
                                    </Row>
                                </Container>
                        }

                    </Card.Text>
                </Card.Body>
            </Card>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default EmployeeDetails
