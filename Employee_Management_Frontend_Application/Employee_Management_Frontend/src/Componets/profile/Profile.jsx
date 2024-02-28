import  { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { profileData } from '../../../public/UtilData'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { employeeManagement_base_URL, employeeManagement_profile_getProfileByEmailId } from '../../../public/ApiUrl';
import Login from '../login/Login';
import { Server_Error_Message } from '../../../public/UtilData';

function Profile() {
  const navigate = useNavigate();
  const[profileData,setProfileData]=useState(); 
  useEffect(()=>{
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {  
      navigate("/login")
    }
    axios.get(employeeManagement_base_URL+employeeManagement_profile_getProfileByEmailId+sessionStorage.getItem("registrationEmail"))
    .then((data)=>{
      setProfileData(data.data)
    })
    .catch((error)=>{
     toast.warning(Server_Error_Message)
    })
  },[])

  return (
    <div style={{
      marginTop: "75px",
      width: "70rem",
      height: "30rem",
    }}>
    {sessionStorage.getItem("registrationEmail")? <Card style={{ marginLeft:'0px',width: '24rem', height:'15rem'}}>
      <Card.Body>
        <Card.Title>{profileData?.employeeName}</Card.Title>
        <Card.Text>
        
        <ul style={{listStyleType:'none'}}>
        <div style={{margin:'2px'}}>
        <li><span style={{fontWeight:'bold',marginRight:'5px'}}>Designation</span><span>{profileData?.employeeDesignation}</span></li>
        <li><span style={{fontWeight:'bold',marginRight:'5px'}}>Employee Id</span><span>{profileData?.employeeId}</span></li>
        <li><span style={{fontWeight:'bold',marginRight:'5px'}}>Phone No</span><span style={{color:'white'}}>{"...."}</span><span>{profileData?.employeeMobileNo}</span></li>
        <li><span style={{fontWeight:'bold',marginRight:'5px'}} >Email Id</span><span style={{color:'white'}}>{"........"}</span><span>{profileData?sessionStorage.getItem("registrationEmail"):''}</span></li>
        </div>
        </ul>
        <Link to="/logout" style={{textDecoration:"none",fontWeight:'bold',fontSize:'20px'}}>Logout</Link> 

        </Card.Text>
      </Card.Body>
    </Card>:<Login></Login>}
   <ToastContainer></ToastContainer>
      
    </div>
  )

}
  
  

export default Profile
