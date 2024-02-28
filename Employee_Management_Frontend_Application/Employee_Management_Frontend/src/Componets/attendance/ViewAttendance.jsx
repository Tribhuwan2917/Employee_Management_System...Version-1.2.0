import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { employeeManagement_attendance_getAllRecord, employeeManagement_base_URL } from '../../../public/ApiUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Server_Error_Message } from '../../../public/UtilData';

function ViewAttendance() {
    const[attendanceData,setAttendanceData]=useState();
    const navigate=useNavigate()
    console.log(sessionStorage.getItem("registrationEmail"))
    useEffect(()=>{
      if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
        navigate('/login')
      }
      axios.get(employeeManagement_base_URL+employeeManagement_attendance_getAllRecord)
      .then((data)=>{
        setAttendanceData(data.data)
      })
      .catch((error)=>{
        toast.error(Server_Error_Message)
      })

    },[])

  return (
    <div style={{marginTop:'80px', height:'520px',textAlign:'center'}}>
       <Card
        >
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>Attendance Record</Card.Title>
        <Card.Text>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>Employee Id</th>
          <th>Date</th>
          <th>In Time</th>
          <th>Out Time</th>
          <th>Working Hour</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {attendanceData?.map((employeeAttendance,index)=>(<tr key={index}>
          <td>{employeeAttendance.employeeId}</td>
          <td>{employeeAttendance.date}</td>
          <td>{employeeAttendance.timeIn?employeeAttendance.timeIn:"---"}</td>
          <td style={{textAlign:'center'}}>{employeeAttendance.timeOut?employeeAttendance.timeOut:"---"}</td>
          <td>{employeeAttendance.workingHour?employeeAttendance.workingHour.toString().slice(0,5):0}</td>
          <td>{employeeAttendance.workingHour?"Present":"Absent"}</td>
        </tr>))}
      </tbody>
    </Table>
        </Card.Text>
        <Button style={{width:'150px',marginLeft:'-1150px'}} variant="danger" onClick={()=>{navigate(-1)}}>Cancel</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default ViewAttendance
