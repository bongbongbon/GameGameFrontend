import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';
import { AuthContext } from '../contexts/AuthContext';
import UserSidebar from './UserSidebar';

function Header() {
  const { logout, user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태

  // 사이드바 열기/닫기 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
            <span className="user-email" onClick={toggleSidebar}>{user.email}</span>
            <button onClick={logout} className="logout-button">로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link">로그인</Link>
            <Link to="/signup" className="auth-link">회원가입</Link>
          </>
        )}
      </div>
      {/* 사이드바 컴포넌트에 상태 전달 */}
      <UserSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </header>
  );
}

export default Header;
