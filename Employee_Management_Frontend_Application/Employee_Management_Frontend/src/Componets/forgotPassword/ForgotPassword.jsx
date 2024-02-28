import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Col, Container, Row, Card, Button, Alert } from 'react-bootstrap'
import { ForgotPasswordSchema } from './ForgotPasswordSchema'
import axios from 'axios'
import { employeeManagement_base_URL, employeeManagement_registration_forgotPasswordEmail_URL } from '../../../public/ApiUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Server_Error_Message } from '../../../public/UtilData'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate=useNavigate();
    const [isSend, setIsSend] = useState('true')
    const [isEmailDatafield,setIsEmailDataFiled]=useState('')
    const [clientOtpData, setClientOtpData] = useState('')
    const [serverOtpData,setServerOtpData]=useState()
    const handleOtpChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        setClientOtpData(value)
     
    }
    const handleOtpSubmit = (event) => {
        event.preventDefault()
        if(clientOtpData==serverOtpData)
        {
            setIsSend('')
            setClientOtpData('')
            sessionStorage.setItem("isVerified",'true');
            toast.success("Account Verfied  Successfully! ")
            setTimeout(()=>{navigate('/changePassword')},3000)

        }else{
            toast.warning("InCurrent Otp")
        }
       
    }
    const formIntialValue = {
        registrationEmail: ''
    }
    const { values, handleBlur, touched, handleChange, handleSubmit, errors } = useFormik({
        initialValues: formIntialValue,
        onSubmit: (values, actions) => {
            setIsEmailDataFiled('true') 
            setIsSend('')
            axios.post(employeeManagement_base_URL+employeeManagement_registration_forgotPasswordEmail_URL,values)
            .then((response)=>{
                setServerOtpData(response.data.otpFromServer)
                sessionStorage.setItem("newRegistrationEmail",values.registrationEmail)
            })
            .catch((error)=>{
                setIsSend('true')
                toast.warning(" Oops! Please Enter Currect Email Id") 
                setIsEmailDataFiled('')  
            })
            actions.resetForm()
        },
        validationSchema: ForgotPasswordSchema
    })
    return (
        <div style={{ margin: '5px' }}>
            <Container>
                <Row>
                    <Col style={{ marginLeft: '390px', marginTop: '80px' }}>
                        <Card style={{ width: '500px', height: '320px', textAlign: 'center', }}>
                            <Card.Body>
                                <Card.Title>{!isSend?<h5>Verify Email Id</h5>:<h5>Enter Email Id</h5>}</Card.Title>
                                <Card.Text>
                                    <Container>
                                        <Row>
                                            <Col>
                                               {
                                                !isEmailDatafield? <form onSubmit={handleSubmit}>
                                                    <div style={{}}>
                                                        <input style={{ width: '400px', height:'40px', borderRadius:'8px', margin: '5px' }} placeholder='Enter the Email Id' name='registrationEmail' type='text' value={values.registrationEmail} onBlur={handleBlur} onChange={handleChange}></input>
                                                    </div>
                                                    {errors.registrationEmail && touched.registrationEmail ? <Alert style={{ marginLeft: '70px', width: '400px', height: '50px' }} variant='danger'>{errors.registrationEmail}</Alert> : null}
                                                    <div>
                                                        <Button style={{ marginTop: '10px',width:'180px',marginLeft:'-220px' }} type='submit'>SendOTP</Button>
                                                    </div>
                                                </form>:null
                                               }
                                                {!isSend?
                                                        <form onSubmit={handleOtpSubmit}>
                                                            <div>
                                                                <label>Enter the OTP</label><br></br>
                                                                <div>
                                                                    <input style={{ width: '400px', height:'40px', borderRadius:'8px' , margin: '5px' }} onChange={handleOtpChange} name='clientOtpData' value={clientOtpData} placeholder='Enter The OTP'></input>
                                                                </div>
                                                                <Button style={{ marginTop: '10px',width:'180px',marginLeft:'-220px' }} type='submit'>Submit</Button>
                                                            </div>
                                                        </form> : null}
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

export default ForgotPassword
