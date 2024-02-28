import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Card, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { employeeManagement_base_URL, employeeManagement_currentProject_postCurrentProject_URL } from '../../../public/ApiUrl';
import { AddCurrentProjectSchema } from './AddCurrentProjectSchema';
import { Server_Error_Message } from '../../../public/UtilData';
function AddCurrentProject() {
    const navigate = useNavigate();
   
        useEffect(() => {
            if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
             navigate("/login") }
            }, [])
    
    const intialCurrentProjectValue = {
        currentProjectId: '',
        currentProjectTitle: '',
        currentProjectLink: '',
        currentProjectObjective: '',
        employeeId: '',
        currentProjectDescription:''

    }
    // C:\Users\tribhuvan pal\Desktop\Employee_Management\Employee_Management_Frontend_Application\Employee_Management_Frontend\src\Componets\addCurrentProject\AddCurrentProject.jsx
    const { handleChange, handleBlur, handleSubmit, touched, errors, values } = useFormik({
        initialValues: intialCurrentProjectValue,
        onSubmit:
            (values, action) => {
                console.log(values.employeeId)
                axios.post(employeeManagement_base_URL + employeeManagement_currentProject_postCurrentProject_URL, values).then((response) => {
                    action.resetForm()
                    toast.success("Current  Project Added Successfully With Current Project Id: " + values.currentProjectId)
                }).catch((error) => {
                    //This Current project Already present in database with current Project Id21
                    if (error.response.data.exceptionMessage === "This Current project Already present in database with current Project Id" + values.currentProjectId) {
                        toast.warning("Oops! This Current project Already Exists with Current Project Id: " + values.currentProjectId)
                    }
                    else if (error.response.data.exceptionMessage === " No Employee Exists Coressponding this current project so that we can not add it ") {
                        toast.warning("Oops! No Employee Exists Coressponding This current Project, So  we Can not add it")
                    }
                    else {
                        toast.error(Server_Error_Message)
                    }

                })
            },

        validationSchema: AddCurrentProjectSchema
    })
    return (
        <div style={{ margin:'5px'}}>
            <Container style={{ marginLeft: '400px', display: 'flex' }}>
                <Row >
                    <Col>
                        <Card style={{  marginTop:'80px', width: '60rem', textAlign: 'center',  height: '500px', marginLeft: '-220px' }}>
                            <Card.Body>
                                <Card.Title>Add Current Project</Card.Title>
                                <Card.Img src=''></Card.Img>
                                <Card.Text>
                                    <form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col>
                                                <div>
                                                    <label>Current Project Id:</label><br></br>
                                                    <input style={{ width: '400px' }} onBlur={handleBlur} type='number' value={values.currentProjectId>0?values.currentProjectId:!values.currentProjectId?'':0} onChange={handleChange} name='currentProjectId'></input>
                                                    {errors.currentProjectId && touched.currentProjectId ? <Alert style={{ marginLeft: '25px', marginTop:'2px',paddingBottom:'30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectId}
                                                     
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Title</label><br></br>
                                                    <input style={{ width: '400px' }} onBlur={handleBlur} type='text' value={values.currentProjectTitle} onChange={handleChange} name='currentProjectTitle'></input>
                                                    <br></br>
                                                    {errors.currentProjectTitle && touched.currentProjectTitle ? <Alert style={{ marginTop:'2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectTitle}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Employee Id</label><br></br>
                                                    <input style={{ width: '400px' }} type='number
                                                    ' value={values.employeeId} onChange={handleChange} onBlur={handleBlur} name='employeeId'></input>
                                                    <br></br>
                                                    {errors.employeeId && touched.employeeId ? <Alert style={{ marginTop:'2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.employeeId}
                                                    </Alert> : null}
                                                </div>
                                            </Col>
                                            <Col>

                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Link</label><br></br>
                                                    <input style={{ width: '400px' }} type='text' value={values.currentProjectLink} onChange={handleChange} onBlur={handleBlur} name='currentProjectLink'></input>
                                                    <br></br>
                                                    {errors.currentProjectLink && touched.currentProjectLink ? <Alert
                                                        style={{ marginTop:'2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectLink}
                                                    </Alert> : null}
                                                </div>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>

                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Objective</label><br></br>
                                                    <textarea onBlur={handleBlur} style={{ width: '400px', height: '200px' }} type='text' value={values.currentProjectObjective} onChange={handleChange} name='currentProjectObjective'></textarea>
                                                    <br></br>
                                                    {errors.currentProjectObjective && touched.currentProjectObjective ? <Alert style={{ marginTop:'2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectObjective}
                                                    </Alert> : null}
                                                </div>

                                            </Col>
                                            <Col>
                                                <div style={{ padding: '2px' }}>
                                                    <label>Project Description</label><br></br>
                                                    <textarea style={{ width: '400px', height: '200px' }} type='text' onBlur={handleBlur} value={values.currentProjectDescription} onChange={handleChange} name='currentProjectDescription'></textarea>
                                                    <br></br>
                                                    {errors.currentProjectDescription && touched.currentProjectDescription ? <Alert style={{ marginTop:'2px', marginLeft: '25px', height: '40px', paddingBottom: '30px', width: '400px' }} variant='danger'>
                                                        {errors.currentProjectDescription}

                                                    </Alert> : null}
                                                </div>

                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col>

                                                <Row>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div></div>
                                                    </Col>
                                                    <Col>
                                                        <div style={{ marginRight: '20px' }}>
                                                            <Button variant='danger' style={{ width: '100px',  marginLeft: '8px' }} onClick={() => { navigate(-1) }} disabled={false}>Cancel</Button>
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div style={{ marginRight: '40px' }}>
                                                            <Button style={{ width: '100px', marginRight: '-15px' }} type='submit' disabled={false}>Add</Button>
                                                        </div>
                                                    </Col>

                                                </Row>
                                            </Col>

                                        </Row>
                                    </form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <ToastContainer></ToastContainer>

        </div>
    )
}

export default AddCurrentProject
