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
        alert('Registration successful! Please log in.');
        setIsLogin(true); // Switch to login view after registration
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error(`Error during ${isLogin ? 'login' : 'registration'}:`, error);
    }
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
        {isLogin ? 'Need to register?' : 'Already registered? Log in'}
      </button>
    </div>
  );
};

export default LoginRegisterPage;
