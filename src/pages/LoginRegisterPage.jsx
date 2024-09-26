import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../services/api'; // API functions

const LoginRegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle form submission for login or registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? loginUser : registerUser;

    try {
      const response = await endpoint({ email, password });
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        navigate('/home'); // Redirect to homepage after login
      } else {
        setErrorMessage('');
        alert('Registration successfull! Please log in.');
        setIsLogin(true); // Switch to login view after registration
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
    }
  };

  return (
    <div  style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
       
       <h1  style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 'normal', fontSize: '24px', marginBottom: '20px' }}>
       <i className=" fa-solid fa-book-open-reader fa-xl" style={{ color: "#4c6d85", }} ></i> {isLogin ? 'Login' : 'Register'} 
  </h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }} >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary" >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px' }}>{errorMessage}</p>}

      <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link" style={{ display: 'block', margin: '10px auto', textAlign: 'center', fontSize: '15px', color: 'white', textDecoration: 'none' }}>
        {isLogin ? 'Need to register?' : 'Already registered? Log in'}
      </button>
    


    </div>
    
  );
};

export default LoginRegisterPage;
