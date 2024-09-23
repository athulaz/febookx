import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import LoginRegisterPage from './pages/LoginRegisterPage'; 
import './bootstrap.min.css'

const App = () => {
  return (
    <Router>
      
      <Routes>
       
        {/* Route for the login/register page */}
        <Route path="/login" element={<LoginRegisterPage />} />

        {/* Route for the home page (book collection) */}
        <Route path="/home" element={<HomePage />} />

        {/* Redirect to login by default if no matching route */}
        <Route path="*" element={<LoginRegisterPage />} />
      </Routes>
    
    </Router>

 
  );
};

export default App;
