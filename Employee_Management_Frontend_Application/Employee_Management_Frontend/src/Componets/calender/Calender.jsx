import React, { useEffect, useState } from 'react'
import { Button, Card, Pagination, Table } from 'react-bootstrap'
import { HolidaysData } from '../../../public/UtilData';
import { Link, useNavigate } from 'react-router-dom';

function Calender() {
  const naviagte=useNavigate()
  const [currentPage,setCurrentPage]=useState(1)
  const recordPerPage=5;
  const lastIndex=recordPerPage*currentPage;
  const firstIndex=lastIndex-recordPerPage;
  const records=HolidaysData.slice(firstIndex,lastIndex)
  const nPage=Math.ceil(HolidaysData.length/recordPerPage)
  const numbers=[...Array(nPage+1).keys()].slice(1)
  useEffect(()=>{
    if (!sessionStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn") === 'false') {
      naviagte('/login')
  }
  },[])
  const nextPage=(event)=>{
    if(currentPage!==nPage)
    {
      setCurrentPage(currentPage+1)
    }

  }
  const prevPage=(event)=>{
    if(currentPage!==1)
    {
      setCurrentPage(currentPage-1)
    }

  }
  const changeCurrentPage=(number)=>{
    setCurrentPage(number)

  }

  
  return (
    <div style={{marginTop:'80px',marginBottom:'10px'}}>
    <Card style={{ marginLeft:'350px',width: '42rem', height:'28rem'}}>
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>Holidays Calender</Card.Title>
        <Card.Text>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{textAlign:'center'}}>Name of Holiday</th>
          <th style={{textAlign:'center'}}>Day</th>
          <th style={{textAlign:'center'}}>No of days</th>
          <th style={{textAlign:'center'}}>From-To</th>
        </tr>
      </thead>
      <tbody>
      {
        records.map((holiday,index)=>(
          <tr key={index}>
            <td style={{textAlign:'center'}}>{holiday.nameOfHoliday}</td>
            <td style={{textAlign:'center'}}>{holiday.day}</td>
            <td style={{textAlign:'center'}}>{Math.round((new Date(holiday.toDate).getTime()-new Date(holiday.fromDate).getTime())/(1000 * 3600 * 24))+1}</td>
            <td style={{textAlign:'center'}}>{holiday.fromDate}<span style={{width:'1px',margin:'8px',fontWeight:'bold'}}>:</span>{holiday.toDate}</td>
          </tr>
        ))
      }
      </tbody>
    </Table>
        </Card.Text>
        <nav>
          <ul className='pagination'>
          <li className='page-item'>
          <Link style={{width:'70px',textAlign:'center',height:'50'}} to="#" className='page-link' onClick={prevPage}>Prev</Link>
          </li>
          {
           numbers.map((number,index)=>(<li key={index} className={`page-item ${currentPage=== number ? 'active' : ''}`}>
<Link to="#" className='page-link' style={{borderRadius:'3px',marginLeft:'0px',height:'50',zIndex:'0',width:'70px',textAlign:'center'}}  onClick={()=>changeCurrentPage(number)} >{number}</Link>
           </li>))
          }
          <li className='page-item'>
          <Link to="#" className='page-link' style={{borderRadius:'5px', width:'70px',textAlign:'center'}} onClick={nextPage}>Next</Link>
          </li>
          <Button variant='danger' style={{width:'250px',marginLeft:'20px',height:'50'}} onClick={()=>{naviagte(-1)}}>Cancel</Button>
          </ul>
        </nav>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Calender
