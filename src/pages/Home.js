import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';


function Home() {


    
  return (
    <div className="home-page">
      <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
    </div>
  
  );
}

export default Home;