import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card,Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { employeeManagement_base_URL, employeeManagement_leave_getLeaveRecord } from '../../../public/ApiUrl';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Server_Error_Message } from '../../../public/UtilData';

function ViewLeaveDetails() {
   const naviagte=useNavigate();
   const [leaveData,setLeaveData]=useState()
useEffect(()=>{
  if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
    naviagte('/login')
  }
    axios.get(employeeManagement_base_URL+employeeManagement_leave_getLeaveRecord)
    .then((data)=>{
      if(data.data==="No Leave Record Found")
      {
        toast.warning("No Any Leave Record Found") 
      }
      else{
        console.log(data.data)
        setLeaveData(data.data)
      }
    })
    .catch((error)=>{
       toast.error(Server_Error_Message)
    })

},[])

  return (
    <div style={{marginTop:'80px', height:'520px',textAlign:'center'}}>
<Card 
><Card.Body>
        <Card.Title style={{textAlign:'center'}}>Leave Record</Card.Title>
        <Card.Text>
        <Table striped bordered hover  size="sm">
      <thead>
        <tr>
          <th style={{textAlign:'center'}}>Employee Id</th>
          <th style={{textAlign:'center'}}>Earned Leave</th>
          <th style={{textAlign:'center'}}>Earned Leave Available</th>
          <th style={{textAlign:'center'}}>Leave Without Pay</th>
          <th style={{textAlign:'center'}}>Tacken Date</th>
          <th style={{paddingBottom:'15px', paddingLeft:'60px'}}>From-To</th>
        </tr>
      </thead>
      <tbody>
      {leaveData?.map((leave,index)=>(
        <tr key={index}>
            <td>{leave?.employeeId}</td>
            <td>{leave?.noOfEarnedLeaveTaken}</td>
            <td>{leave?.noOfEarnedLeaveAvailable}</td>
            <td>{leave?.noOfLeaveWithoutPayTacken}</td>
            <td>{leave?.leaveTackenDate}</td>
            <td>{leave?.leaveFromDate}<span style={{width:'1px',margin:'8px',fontWeight:'bold'}}>{leave?.leaveFromDate?":":''}</span>{leave?.leaveToDate}</td>
        </tr>
      ))}
      </tbody>
    </Table>
         
        </Card.Text>
        <Button variant="danger" style={{width:'150px',marginLeft:'-1150px'}} onClick={()=>{
            naviagte(-1)
        }}>Cancel</Button>
      </Card.Body>
    </Card> 
    <ToastContainer></ToastContainer>   </div>
  )
}

export default ViewLeaveDetails
