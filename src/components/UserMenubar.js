import React, { useState } from 'react';
import '../css/UserMenubar.css';
import { Link } from 'react-router-dom';

function UserMenubar() {
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
    <div className='user-menubar'>
      <ul className="user-menubar-list">
        <li>
          <button className="user-menubar-mainmenu" onClick={toggleAccountMenu}>
            계정
          </button>
          {isAccountOpen && (
            <ul className="user-menubar-submenu">
              <li><Link to="/user/account/profile">프로필</Link></li>
              <li><Link to="/user/account/delete">계정 삭제</Link></li>
            </ul>
          )}
        </li>
        <li>
          <button className="user-menubar-mainmenu" onClick={toggleResumeMenu}>
            이력서
          </button>
          {isResumeOpen && (
            <ul className="user-menubar-submenu">
              <li><Link to="/resume/create">이력서 작성</Link></li>
              <li><Link to="/resume/my">이력서 조회</Link></li>
            </ul>
          )}
        </li>
        <li>
          <button className="user-menubar-mainmenu" onClick={togglePortfolioMenu}>
            포트폴리오
          </button>
          {isPortfolioOpen && (
            <ul className="user-menubar-submenu">
              <li><Link to="/portfolio/create">포트폴리오 작성</Link></li>
              <li><Link to="/portfolio/view">포트폴리오 조회</Link></li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default UserMenubar;
