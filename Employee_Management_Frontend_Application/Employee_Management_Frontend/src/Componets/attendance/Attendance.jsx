import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { employeeManagement_attendance_punchIn, employeeManagement_attendance_punchOut, employeeManagement_base_URL } from '../../../public/ApiUrl'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Server_Error_Message } from '../../../public/UtilData'
function Attendance() {
    const [attendanceData,setAttendanceData]=useState({
        employeeId:'',
        attendanceType:''
    })
    const naviagte = useNavigate()
    useEffect(() => {
      if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {  
        naviagte("/login")
}})


    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setAttendanceData({...attendanceData,[name]:value})
    }
    const  handleSubmit=(event)=>{
      console.log(sessionStorage.getItem("registrationEmail"))
        const attendanceDataForSending={
            employeeId:attendanceData.employeeId,
            employeeEmailId:sessionStorage.getItem("registrationEmail")
        }
        event.preventDefault()
        if(attendanceData.attendanceType==='punchIn')
        {
          console.log(attendanceDataForSending)
          axios.post(employeeManagement_base_URL+employeeManagement_attendance_punchIn,attendanceDataForSending)
          .then((data)=>{
            if(data.data.message==='Employee Successfully Punch In with employee Id: '+attendanceData.employeeId)
            {
                toast.success("Attendance Recorded Successfully")
            }else if(data.data==="Incurrect email Id")
            {
              
              toast.error("Unauthorized Employee, To Mark The Attendance With This Account")
            }
            else
            {
                toast.error("Oops! Incorrect Employee Id")
            }
          })
          .catch((error)=>{
            toast.error(Server_Error_Message)
          })
        }
        else{
            axios.post(employeeManagement_base_URL+employeeManagement_attendance_punchOut,attendanceDataForSending)
          .then((data)=>{
            if(data.data.message==='Employee PunchOut Successfully with employee Id: '+attendanceData.employeeId)
            {
                toast.success("Attendance Recorded Successfully")
            }
            else if(data.data==='Employee does not exitst with employee Id: '+attendanceData.employeeId)
            {
                toast.error("Oops! Incorrect Employee Id")
            }else if(data.data==="Incurrect email Id")
            {
              toast.error("Unauthorized Employee, To Mark The Attendance With This Account")
            }
            else
            {
              console.log(data.data.message)
                toast.error("Employee have not punch in till now!")
            }
          })
          .catch((error)=>{
            toast.error(Server_Error_Message)

          })
        }
    }

  return (
    <div style={{marginTop:'80px',marginBottom:'10px'}}>
      <Card style={{ marginLeft:'420px',width: '32rem', height:'24rem'}}>
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>Attendance Portal</Card.Title>
        <Card.Text>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Employee Id</Form.Label>
        <Form.Control required onChange={handleChange} name='employeeId' type="number" placeholder="Enter Employee Id" />
      </Form.Group>
      <Form.Group  className="mb-3" style={{display:'flex'}} controlId="formBasicCheckbox">
        <Form.Check required onChange={handleChange} type="radio" name='attendanceType' style={{margin:'20px'}} value="punchIn" label="PunchIn" />
        <Form.Check required onChange={handleChange} type="radio" name='attendanceType' style={{margin:'20px'}} value="punchOut" label="PunchOut" />
      </Form.Group>
      <div style={{display:'flex'}}>
      <Button style={{ marginRight:'20px',width:'120px'}} variant="primary" type="submit">
        Submit
      </Button>
      <Button style={{width:'120px'}} onClick={()=>{naviagte(-1)}} variant='danger'>Cancel</Button>
      </div>
    </Form>
        </Card.Text>
      </Card.Body>
    </Card>
    <ToastContainer></ToastContainer>
    </div>
  )
}

export default Attendance
