import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { LeaveTypes, Server_Error_Message } from '../../../public/UtilData'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { employeeManagement_base_URL, employeeManagement_leave_apply } from '../../../public/ApiUrl';

function ApplyLeave() {
    const [leaveData,setLeaveData]=useState({
        employeeId:'',
        fromDate:'',
        toDate:'',
        leaveType:'',
        employeeEmailId:sessionStorage.getItem("registrationEmail")
    })
    const naviagte=useNavigate()
    useEffect(()=>{
      if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
        naviagte('/login')
    }
    },[])
    const handleChange=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
      
        setLeaveData({...leaveData,[name]:value})
    }
    const handleSubmit=(event)=>{
        console.log(leaveData)
        event.preventDefault()
        if(leaveData.fromDate>=leaveData.toDate)
        {
            toast.warning("From Date should be less than to Date")
        }
        else{
            axios.post(employeeManagement_base_URL+employeeManagement_leave_apply,leaveData)
            .then((data)=>{
                console.log(data)
                if(data?.data?.message==="Earn Leave applying Succcessfully with employee Id: "+leaveData.employeeId)
                {
                    toast.success("Learn Leave Apply Successfully!")
                }
                else if(data?.data?.message==="Leave Without Pay Applying Successfully! with employee Id: "+leaveData.employeeId)
                {
                    toast.success("Leave Without Pay apply Successfully!")
                }
                else if(data?.data==="Unauthorized for Applying leave with this email Id")
                {
                    toast.error("Unauthorized Employee, To Apply Leave With This Account")
                }
                else if(data?.data==="UnSufficient Eearn leave")
                {
                    toast.warning("Oops! , UnSufficient Available Eearn leave")
                }
                
                else if(data?.data==="Employee does not Exists with employee Id: "+leaveData.employeeId){
                    toast.error("No Employee Exists with Employee Id "+leaveData.employeeId)
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
        <Card.Title style={{textAlign:'center'}}>Apply Leave</Card.Title>
        <Card.Text>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicNumber">
        <Form.Label>Employee Id</Form.Label>
        <Form.Control required onChange={handleChange} name='employeeId' type="number" placeholder="Enter Employee Id" />
      </Form.Group>
      <div style={{display:'flex'}}>
      <Form.Group  className="mb-3" style={{display:'flex',width:'300px',height:'40px',marginRight:'20px'}} controlId="formBasicDate">
        <Form.Label> From date</Form.Label>
        <Form.Control required onChange={handleChange} name="fromDate" type='date'></Form.Control>
      </Form.Group>
      <Form.Group  className="mb-3" style={{display:'flex',width:'300px',height:'40px',marginLeft:'20px'}} controlId="formBasicDate">
        <Form.Label> To date</Form.Label>
        <Form.Control required onChange={handleChange} name="toDate" type='date'></Form.Control>
      </Form.Group>
      </div>
      <Form.Group>
      <Form.Label>Leave Type</Form.Label>
      <Form.Select name='leaveType' onChange={handleChange} aria-label="Default select example">
      {LeaveTypes.map((leaveType,index)=>(
        <option  key={index} value={leaveType}>{leaveType}</option>
      ))}
    </Form.Select>
    </Form.Group>
      <div style={{display:'flex'}}>
      <Button style={{ marginRight:'20px',width:'120px',marginTop:'10px'}} variant="primary" type="submit">
        Submit
      </Button>
      <Button style={{width:'120px',marginTop:'10px'}} onClick={()=>{naviagte(-1)}} variant='danger'>Cancel</Button>
      </div>
    </Form>
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    <ToastContainer></ToastContainer>
    </div>
  )
}

export default ApplyLeave
