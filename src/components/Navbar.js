import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css'; // 스타일을 적용할 CSS 파일

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
          <li>
            <Link to="/team">팀 찾기</Link>
          </li>
          <li>
            <Link to="/member">멤버 찾기</Link>
          </li>
          <li>
            <Link to="/portfolio">포트폴리오</Link>
          </li>
          <li>
            <Link to="/success">합격 tip</Link>
          </li>
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
      </ul>
    </nav>
  );
}

export default Navbar;
