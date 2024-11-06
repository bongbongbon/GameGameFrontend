import React, { useContext, useState } from 'react';
import '../css/UserSidebar.css';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function UserSidebar({ isOpen, toggleSidebar }) {
  const { user } = useContext(AuthContext);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);


  const toggleAccountMenu = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  const toggleResumeMenu = () => {
    setIsResumeOpen(!isResumeOpen);
  };

  const togglePortfolioMenu = () => {
    setIsPortfolioOpen(!isPortfolioOpen);
  };

  return (
    <div className={`user-sidebar ${isOpen ? 'open' : ''}`}>
      <a className='user-sidebar-logo'>개발 세발</a>
      <button className="user-sidebar-close-button" onClick={toggleSidebar}>X</button>
      <div className='user-sidebar-profile'>
        {user ? (
          <div className="user-profile">
            <img src={user.profilePicture || 'default-profile.png'} alt="Profile" className="user-profile-picture" />
            <div className="user-profile-info">
              <span className="user-email">{user.email}</span>
              <span className="user-nickname">{user.nickName}</span>
            </div>
          </div>
        ) : (
          <p className="guest-message">로그인 해주세요.</p>
        )}
      </div>

      <ul className="user-sidebar-list">
        <li>
          <a className="user-sidebar-mainmenu" onClick={toggleAccountMenu}>
            계정
          </a>
          {isAccountOpen && (
            <ul className="user-sidebar-submenu">
              <li><Link to="/user/account/profile">프로필</Link></li>
              <li><Link to="/user/account/delete">계정 삭제</Link></li>
            </ul>
          )}
        </li>
        <li>
          <a className="user-sidebar-mainmenu" onClick={toggleResumeMenu}>
            이력서
          </a>
          {isResumeOpen && (
            <ul className="user-sidebar-submenu">
              <li><Link to="/resume/create">이력서 작성</Link></li>
              <li><Link to="/resume/my">이력서 조회</Link></li>
            </ul>
          )}
        </li>
        <li>
          <a className="user-sidebar-mainmenu" onClick={togglePortfolioMenu}>
            포트폴리오
          </a>
          {isPortfolioOpen && (
            <ul className="user-sidebar-submenu">
              <li><Link to="/portfolio/create">포트폴리오 작성</Link></li>
              <li><Link to="/portfolio/view">포트폴리오 조회</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default UserSidebar;
