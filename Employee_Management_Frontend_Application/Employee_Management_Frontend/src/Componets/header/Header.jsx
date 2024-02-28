import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Employee_dummy_profile_image_URL } from '../../../public/UtilData';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
function Header() {
  return (<>
    <Navbar expand="lg" style={{ zIndex: '3', position: 'fixed',textAlign:'center' }} className="bg-body">
      <Container style={{ backgroundColor: '#333333', padding: '0px', margin: '0px' }} fluid>
        <Navbar.Brand href="/profile" style={{ backgroundColor: '#333333' }}>
          <img src={sessionStorage.getItem("employeeImageUrl")&&sessionStorage.getItem("employeeImageUrl")!=="undefined"?sessionStorage.getItem("employeeImageUrl"):Employee_dummy_profile_image_URL} style={{ borderRadius: '50%' }} href="/profile" width={50} height={50} ></img>
          <span style={{ marginLeft:'300px',color:'#696969',fontSize:'25px',fontStyle:'italic'}}>
            Employee Management System
          </span>
        </Navbar.Brand>
        <span style={{marginRight:'50px'}}>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link style={{color:'white',fontSize:'20px',borderBlockStyle:'none'}} href="/home">Home</Nav.Link>
              {/* <Link to=""></Link> */}
              <Nav.Link style={{color:'white',fontSize:'20px',borderBlockStyle:'none'}} href="/employeeDetails">Employee Details</Nav.Link>
              <Dropdown>
      <Dropdown.Toggle style={{color:'white',fontSize:'20px',borderBlockStyle:'none'}} variant="Secondary" id="dropdown-basic">
      Project
      </Dropdown.Toggle>
      <Dropdown.Menu style={{marginLeft:'1px',width:'80px'}}>
     
        <Dropdown.Item href="/currentProjectDetails">Current Project</Dropdown.Item>
        <hr style={{margin:'1px'}}></hr>
        <Dropdown.Item href="/priviousProjectDetails">Privious Project</Dropdown.Item>
       
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown>
      <Dropdown.Toggle style={{color:'white',fontSize:'20px',borderBlockStyle:'none'}} variant="Secondary" id="dropdown-basic">
      Attendance
      </Dropdown.Toggle>
      <Dropdown.Menu style={{marginLeft:'1px',width:'80px'}}>
        <Dropdown.Item href="/markTheAttendance">Mark Attendance</Dropdown.Item>
        <hr style={{margin:'1px'}}></hr>
        <Dropdown.Item href="/viewAttendance">View Attendance</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   <Dropdown>
      <Dropdown.Toggle style={{color:'white',fontSize:'20px',borderBlockStyle:'none'}} variant="Secondary" id="dropdown-basic">
      Leave
      </Dropdown.Toggle>
      <Dropdown.Menu style={{marginLeft:'-10px',width:'80px'}}>
        <Dropdown.Item href="/applyLeave">Apply Leave</Dropdown.Item>
        <hr style={{margin:'1px'}}></hr>
        <Dropdown.Item href="/viewLeaveDetails">View Leave Details</Dropdown.Item>
        <hr style={{margin:'1px'}}></hr>
        <Dropdown.Item href="/holidayCalender">Holiday Calender</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </span>
      </Container>
    </Navbar>
  </>
  );
}

export default Header;