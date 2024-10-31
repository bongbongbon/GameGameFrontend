import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../css/Notice.css';
import NoticeNavbar from '../components/NoticeNavbar';

function Notice() {

  const noticeList = [
    "공지사항 1: 시스템 점검 안내",
    "공지사항 2: 새로운 기능 업데이트",
    "공지사항 3: 이용약관 변경 사항",
    "공지사항 4: 이벤트 참여 안내"
  ];

    
  return (
    <div className="notice-page">
      <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div>
        <NoticeNavbar />
      </div>
      <div className='notice-content'>
      <ul>
          {noticeList.map((notice, index) => (
            <li key={index}>{notice}</li>
          ))}
        </ul>
      </div>
    </div>
  
  );
}

export default Notice;