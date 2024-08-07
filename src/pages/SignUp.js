import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/SignUp.css'
import Navbar from '../components/Navbar';
import Header from '../components/Header';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState(null); // Initialize as null
  const [message, setMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

  }



  return (
    <div className='signup-page'>
    <div className="header-container">
        <Header />  
    </div>
    <div className="navbar-container">
      <Navbar />
    </div>
    <div className='signup-content'>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className='signup-form'>
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
        <div className='form-group'>
          <label>비밀번호 확인:</label>
          <input
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <button type="submit" className='signup-button'>완료</button>
      </form>
      <p>{message}</p>
    </div>

    </div>
  );
}

export default SignUp;