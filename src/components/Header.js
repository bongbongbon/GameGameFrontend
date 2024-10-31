import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import { AuthContext } from '../contexts/AuthContext';

function Header() {
  const {user, logout} = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="logo-text">개발 세발</span>
        </Link>
      </div>
      <div className="auth-links">
      {user ? (
          <>
            <span className="username">{user}</span>
            <button onClick={logout} className="logout-button">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link">로그인</Link>
            <Link to="/signup" className="auth-link">회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
