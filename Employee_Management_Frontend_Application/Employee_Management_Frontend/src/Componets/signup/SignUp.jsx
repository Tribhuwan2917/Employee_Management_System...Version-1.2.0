import React, { useState } from 'react'
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { Form, useFormik } from 'formik'
import { FormSchema } from './FormSchema'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_registration_postRegistration_URL } from '../../../public/ApiUrl'
import { Server_Error_Message } from '../../../public/UtilData'

// toast.configure() 
function SignUp() {
  const [message, setMessage] = useState({
    successMessage: '',
    failureMessage: ''
  })
  const navigate = useNavigate();
  const formIntialValue = {
    registrationEmail: '',
    registraionPassword: '',
    registraionConfirmPassword: ''

  }

  const { handleChange, handleSubmit, values, errors, touched, handleBlur } = useFormik({
    initialValues: formIntialValue,
    onSubmit: (values, action) => {
      const valueNeddToSubmitted={
        registrationEmail:values.registrationEmail,
        registraionPassword:values.registraionPassword
      }
      axios.post(employeeManagement_base_URL + employeeManagement_registration_postRegistration_URL, valueNeddToSubmitted)
        .then((response) => {
          toast.success("Employee Successfully Register");
          setTimeout(() => {
            navigate('/login')
          }, 3000)
        }).catch((error) => {
         
          if (error.response.data.exceptionMessage === "Registration with Email Id: " + values.registrationEmail + "already exists") {
            toast.warning("Employee Already Register With Email Id: " + values.registrationEmail)
          }
          else {
            toast.warning(Server_Error_Message);
          }
        })
      action.resetForm();
    },
    validationSchema: FormSchema
  })
  return (
    <div>
      <Container style={{ marginLeft: '400px', display: 'flex', marginBottom: '5px' }}>
        <Row >
          <Col>
            <Card style={{ zIndex: '-1', position: 'inherit', marginTop: '120px', width: '38rem', textAlign: 'center', height: '400px' }}>
              <Card.Body>
                <Card.Title>Employee Registration</Card.Title>
                <Card.Img src=''></Card.Img>
                <Card.Text>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>Email Id</label><br></br>
                      <div>
                        <input  placeholder='Enter The Email Id' type='text' style={{ width:  '420px',height:'40px', borderRadius:'8px' }} value={values.registrationEmail} onBlur={handleBlur} onChange={handleChange} name='registrationEmail'></input>
                      </div>
                      {errors.registrationEmail && touched.registrationEmail ? <Alert style={{ borderRadius:'10px',marginTop: '2px', marginLeft: '75px', width: '420px', height: '35px', paddingBottom: '35px' }} variant='danger'>
                        {errors.registrationEmail}
                      </Alert> : null}
                    </div>
                    <div>
                      <label> Password</label><br></br>
                      <input placeholder="Enter The Password" onBlur={handleBlur} style={{ width:  '420px',height:'40px', borderRadius:'8px' }} type='text' value={values.registraionPassword} onChange={handleChange} name='registraionPassword'></input>
                      <br></br>
                      {errors.registraionPassword && touched.registraionPassword ? <Alert style={{ borderRadius:'10px', marginTop: '2px', marginLeft: '75px', width: '420px', height: '35px', paddingBottom: '35px' }} variant='danger'>
                        {errors.registraionPassword}
                      </Alert> : null}
                    </div>
                    <div>
                      <label> Confirm Password</label><br></br>
                      <input placeholder="Enter The Confirm  Password" onBlur={handleBlur} style={{ width:  '420px',height:'40px', borderRadius:'8px' }} type='text' value={values.registraionConfirmPassword} onChange={handleChange} name='registraionConfirmPassword'></input>
                      <br></br>
                      {errors.registraionConfirmPassword && touched.registraionConfirmPassword ? <Alert style={{borderRadius:'10px', marginTop: '2px', marginLeft: '75px', width: '420px', height: '35px', paddingBottom: '35px' }} variant='danger'>
                        {errors.registraionConfirmPassword}
                      </Alert> : null}
                    </div>
                    <div>
                      <Button style={{ marginTop: '30px', width: '200px', marginLeft: '15px' }} type='submit' disabled={false}>SignUp</Button>
                    </div>
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

export default SignUp
