import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import '../css/Home.css';

function Home() {

    
  return (
    <div className="home-page">
      <section className="header-container">
        <Header />  
      </section>
      <section className="navbar-container">
        <Navbar />
      </section>
      <section className='home-content'>
        <div>
        <p className="home-title">개발세발에서 팀을 이루어보세요</p>
        <p className='home-sub-title'>포트폴리오를 올리고 피드백을 받아보세요</p>
        </div>
      </section>
      <section>

      </section>
    </div>
  
  );
}

export default Home;