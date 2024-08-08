import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { AuthContext } from '../contexts/AuthContext';

import '../css/Login.css';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const handlePageChange = (path) => {
    navigate(path);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      alert('로그인 실패: ' + error.response.data.errorMessage);
    }
  };

  return (
    
    <div className='login-page'>
      <div className="header-container">
          <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>

      <div className='login-content'>
        <h2>로그인</h2>
        <form onSubmit={handleLogin} className='login-form'>
          <div className='form-group'>
            <label>이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>비밀번호:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
          </div>
          <button type="submit" className='login-button'>로그인</button>
        </form>
        <h2 onClick={() => handlePageChange('/signup')} className='clickable-text'>회원가입</h2>
      </div>
    </div>
  );
}

export default Login;
