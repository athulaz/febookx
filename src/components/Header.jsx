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
    
      
    
        <nav className="bg-dark text-white ">
         

          
          <Navbar expand="lg" className="bg-body-tertiary">

          
  <Navbar.Brand  > <i className="ms-5 fa-solid fa-book-open-reader fa-2xl" style={{ color: "#4c6d85", }} />{' '} BookX</Navbar.Brand>
 
  

</Navbar>
        </nav>




  );
};

export default Header;
