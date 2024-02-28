import React, { useState } from 'react'
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { Form, useFormik } from 'formik'
import { FormSchema } from './FormSchema.jsx'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_profile_getProfileByEmailId, employeeManagement_registration_getRegistration_URL } from '../../../public/ApiUrl.jsx'
import { Server_Error_Message } from '../../../public/UtilData.jsx'
function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    successMessage: '',
    failureMessage: ''
  })
  const formIntialValue = {
    registrationEmail: '',
    registraionPassword: ''
  }
  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    initialValues: formIntialValue,
    onSubmit: (values, action) => {
      if (sessionStorage.getItem("isLoggedId") !== 'true'||!sessionStorage.getItem("isLoggedIn")) {
        axios.get(employeeManagement_base_URL + employeeManagement_registration_getRegistration_URL + values.registrationEmail).then((response) => {
          if (response.data.registrationEmail === values.registrationEmail && response.data.registraionPassword === values.registraionPassword) {
            axios.get(employeeManagement_base_URL+employeeManagement_profile_getProfileByEmailId+values.registrationEmail)
            .then((data)=>{
              toast.success("Employee Successfully Logged In")
              sessionStorage.setItem("employeeImageUrl",data.data.profileImageUrl
              )
            })
            .catch((error)=>{
              // console.log("Oops! Something Went Wrong, Please Try After SomeTime")
              toast.warning("Please  add,  as Employee.")
            })
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("registrationEmail", values.registrationEmail);
            sessionStorage.setItem("registraionPassword", values.registraionPassword);
            setTimeout(()=>{ navigate('/home'),location.reload()},4000)
             
             
          }
          else {
            toast.warning("Oops! Incorrect Password");
            sessionStorage.clear()
          }
        }).catch((error) => {
          if (error.response.data.exceptionMessage === "Registration With Email Id: " + values.registrationEmail + "Not Found") {
            toast.warning("Employee Does not exists with Email Id: " + values.registrationEmail)
          }
          else {
            toast.warning(Server_Error_Message)
          }
          sessionStorage.clear();
        })
      }
      else {
        sessionStorage.clear();
        toast.info("Employee already Logged In")
      }
      action.resetForm()
    },
    validationSchema: FormSchema
  })
  return (
    <div>
      <Container style={{ marginLeft: '400px', display: 'flex',  marginBottom:'5px'}}>
        <Row >
          <Col>
            <Card style={{ zIndex: '-1', position: 'inherit', marginTop: '120px', width: '33rem', textAlign: 'center', height: '350px' }}>
              <Card.Body>
                <Card.Title>Employee Login</Card.Title>
                <Card.Text>
                  <form onSubmit={handleSubmit}>
                    <div style={{ padding: '2px' }}>
                      <label>Email Id</label><br></br>
                      <input placeholder='Enter The Email Id' style={{ width:  '420px',height:'40px', borderRadius:'8px' }} type='text' value={values.registrationEmail} onBlur={handleBlur} onChange={handleChange} name='registrationEmail'></input><br></br>
                      {errors.registrationEmail && touched.registrationEmail ? <Alert style={{ borderRadius:'10px',marginTop: '2px', marginLeft: '35px', width: '420px', height: '35px', paddingBottom: '35px' }} variant='danger'>
                        {errors.registrationEmail}
                      </Alert> : null}
                    </div>
                    <div style={{ padding: '2px' }}>
                      <label>  Password</label><br></br>
                      <input placeholder='Enter the Password'  style={{ width:  '420px',height:'40px', borderRadius:'8px' }} type='text' value={values.registraionPassword} onBlur={handleBlur} onChange={handleChange} name='registraionPassword'></input>
                      <br></br>
                      {errors.registraionPassword && touched.registraionPassword ? <Alert style={{ borderRadius:'10px',marginTop: '2px', marginLeft: '35px', width: '420px', height: '35px', paddingBottom: '35px' }} variant='danger'>
                        {errors.registraionPassword}
                      </Alert> : null}
                    </div>
                    <div style={{marginLeft:'-280px', marginTop:'5px'}}><Link style={{textDecoration:'none'}} to="/forgotPassword">Forgot Password</Link></div>
                    <div style={{ margin: '5px'}}>
                      <Button style={{ marginTop:'20px',width:'250px', marginLeft:'0px'}} type='submit' >Login</Button>
                    </div>
                  </form>
                </Card.Text>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  )
}

export default Login
