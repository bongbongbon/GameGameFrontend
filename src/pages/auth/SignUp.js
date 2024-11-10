import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import '../../css/SignUp.css';


function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userRole] = useState('USER');
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext); // Ensure signup function is defined in AuthContext




  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await signup(email, password, passwordCheck, nickName, phoneNumber, userRole); // Ensure this function exists
      alert('회원가입 성공!');
      navigate('/login');
    } catch (error) {
      alert('회원가입 실패: ' + (error.response?.data?.errorMessage || error.message));
    }
  };

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
      <form onSubmit={handleSignUp} className='signup-form'>
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
          <label>핸드폰 번호: (ex010-0000-0000)</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>닉네임:</label>
          <input
            type="text"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>

        <button type="submit" className='signup-button'>완료</button>
      </form>

    </div>

    </div>
  );
}

export default SignUp;