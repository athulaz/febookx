import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-dark text-white p-3 mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <h1>BookX</h1>
        <nav>
          <Link to="/home" className="text-white text-decoration-none me-3">Home</Link>
          <Link to="/home" className="text-white text-decoration-none">About</Link>
          
        </nav>
      </div>
    </header>
  );
};

export default Header;
