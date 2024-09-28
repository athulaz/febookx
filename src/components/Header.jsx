import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {

  
  return (
    
      
    
      
        
<Navbar expand="lg" className=" border-0 py-4" style={{ backgroundColor: 'black' }}>
      <Container>
      <span><i className="fa-solid fa-book-open-reader fa-3x me-3"></i> <span className='fs-4'>BookX</span></span>
      </Container>
    </Navbar>
      




  );
};

export default Header;
