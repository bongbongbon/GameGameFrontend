import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // 스타일을 적용할 CSS 파일

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
          <li>
            <Link to="/quiz">퀴즈</Link>
          </li>
          <li>
            <Link to="/board">게임게시판</Link>
          </li>
      </ul>
    </nav>
  );
}

export default Navbar;
