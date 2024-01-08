import React from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../utils/config';


function Students({students,getAllStudents}) {

  const navigate = useNavigate();
  const handleDelete = async (id)=>{
   let res =  await axios.delete(`${config.API_URL}/students/${id}`)
      if (res.status===200){
          console.log('student deleted');
          getAllStudents();
       
      }
  }
  return (
   <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Mentor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map((e,i)=>{
              return <tr key={ i }>
                <td>{ i+1 }</td>
                <td>{ e.name }</td>
                <td>{ e.email }</td>
                <td>{ e.mentor ? e.mentor : 'not Assigned' }</td>
                <td>
                  <Button variant='danger' onClick={ ()=>handleDelete(`${e._id}`)}>Delete</Button>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
   </div>
  )
}

export default Students;