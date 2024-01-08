import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Students from './components/Students'
import Mentors from './components/Mentors'
import { useEffect, useState } from 'react'
import axios from 'axios'
import config from './utils/config'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {

  const [students,setStudents] = useState([]);
  const [mentors,setMentors] = useState([]);
  const getAllStudents = async ()=>{
    try {
      let res = await axios.get(`${ config.API_URL }/students`);
      if (res.status===200){
        setStudents(res.data);
      }
    }catch (error) {
      console.log(error);
    }
  }

  const getAllMentors = async ()=>{
    try {
      let res = await axios.get(`${ config.API_URL }/mentors`)
       if (res.status===200) {
        setMentors(res.data);
       }
    }catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllStudents();
    getAllMentors();
  },[])


  return (
    <div>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='/students'>Students</Nav.Link>
            <Nav.Link href="/mentors">Mentors</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Router>
          <Routes>
            <Route path='/' element = { <Dashboard/> }> </Route>
            <Route path='/students' 
               element = { <Students 
                students = { students }
                getAllStudents = { getAllStudents }
              /> }></Route>
            <Route path='/mentors' element = { <Mentors 
            mentors={ mentors }
            getAllMentors = { getAllMentors }
            /> }></Route>
          </Routes>
      </Router>
    </div>
  )
}

export default App
