import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css'; // CSS 파일 임포트

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <span className="logo-text">GameGame</span>
        </Link>
      </div>
      <div className="auth-links">
        <Link to="/login" className="auth-link">로그인</Link>
        <Link to="/signup" className="auth-link">회원가입</Link>
      </div>
    </header>
  );
}

export default Header;
