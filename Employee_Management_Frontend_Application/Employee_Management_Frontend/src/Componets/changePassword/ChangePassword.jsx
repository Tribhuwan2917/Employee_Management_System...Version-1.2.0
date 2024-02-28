import { useFormik } from 'formik';
import React from 'react'
import { Container, Row, Col, Card, Button,Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChangePasswordSchema } from './ChangePasswordSchema';
import axios from 'axios';
import { employeeManagement_base_URL, employeeManagement_registration_updateRegistration_URL } from '../../../public/ApiUrl';
import { Server_Error_Message } from '../../../public/UtilData';

function ChangePassword() {
    const naviagte = useNavigate()
        if (!sessionStorage.getItem("isVerified") || sessionStorage.getItem("isVerified") == 'false') {
            naviagte("/forgotPassword")

        }
    const passwordChangeIntialValue=
    {
        newPassword:'',
        confirmPassword:''
    }
    const{values,handleBlur,handleChange,handleSubmit,errors,touched}=useFormik({
        initialValues:passwordChangeIntialValue,
        onSubmit:(values,action)=>{
            const updatedPasswordData={registrationEmail:sessionStorage.getItem('newRegistrationEmail'),
            registraionPassword:values.newPassword}
        axios.put(employeeManagement_base_URL+employeeManagement_registration_updateRegistration_URL,updatedPasswordData)
        .then((reponse)=>{
            toast.success("Your Password Successfully Updated!")
            setTimeout(()=>{ naviagte('/login')},3000)
        })
        .catch((error)=>{
            toast.warning(Server_Error_Message)
        })
        action.resetForm();
        },
        validationSchema:ChangePasswordSchema
    })

    return (
        <div style={{ margin: '5px' }}>
            <Container>
                <Row>
                    <Col style={{ marginLeft: '400px', marginTop: '80px' }}>
                        <Card style={{ width: '450px', height: '320px' }}>
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center'}}>Update Password</Card.Title>
                                <Card.Text>
                                    <Container>
                                        <Row>
                                            <Col>
                                              <form onSubmit={handleSubmit}>
                                               <label style={{margin:'5px',marginLeft:'0px'}}>New Password</label>
                                              <div  >
                                                    <input style={{width:'400px',height:'40px', borderRadius:'8px'}} type='text' value={values.newPassword} onChange={handleChange} placeholder='Enter The Password' onBlur={handleBlur} name='newPassword'></input>
                                                    <br></br>
                                                    {errors.newPassword && touched.newPassword ? <Alert style={{ marginLeft:'0px', marginTop: '2px', paddingBottom: '30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.newPassword}
                                                        </Alert> : null
                                                        }
                                                </div>
                                               <label style={{height:'32px'}}> Confirm Password</label>
                                                <div  >
                                                    <input style={{width:'400px' ,height:'40px', borderRadius:'8px'}} placeholder='Enter The Confirm Password'  type='text' onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} name='confirmPassword'></input>
                                                    <br></br>
                                                    {errors.confirmPassword&&touched.confirmPassword?
                                                    <Alert style={{ marginLeft:'0px', marginTop: '3px', paddingBottom: '30px', height: '40px', width: '400px' }} variant='danger'>
                                                        {errors.confirmPassword}
                                                        </Alert> : null
                                                        }
                                                </div>
                                                <Button style={{marginTop:'15px', width:'200px',textAlign:'center'}} type='submit'>Submit</Button>
                                              </form>

                                            </Col>
                                        </Row>
                                    </Container>

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

export default ChangePassword
