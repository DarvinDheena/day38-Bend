import axios from 'axios';
import React from 'react';
import Table from 'react-bootstrap/Table';
import  Button  from 'react-bootstrap/button';
import config from '../utils/config';

function Mentors({mentors,getAllMentors}) {

  const handleDelete = async (id)=>{
    const res = await axios.delete(`${config.API_URL}/mentors/${id}`);
    if (res.status === 200 ){
      console.log('id deleted');
      getAllMentors();
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
            <th>Students</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            mentors.map((e,i)=>{
              return <tr key={ i }>
                <td>{ i+1 }</td>
                <td>{ e.name }</td>
                <td>{ e.email }</td>
                <td>{ e.students ? e.students[0] : 'not Assigned' }</td>
                <td>
                  <Button variant='danger' onClick={()=>handleDelete(e._id)}>Delete</Button>
                </td>
              </tr>
            })
          }
        </tbody>
      </Table>
   </div>
  )
}

export default Mentors;