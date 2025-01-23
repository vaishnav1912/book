import React from 'react'
import { Container, Navbar } from 'react-bootstrap'


const Header = () => {
  return (
    <Navbar className="bg-info">
    <Container>
      <Navbar.Brand style={{color:"white"}} className='fw-bolder fs-5' >
      <i class="fa-solid fa-book me-3"></i>Book Management
      </Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default Header