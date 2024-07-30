import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

function Notice() {


    
  return (
    <div className="notice-page">
      <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
    </div>
  
  );
}

export default Notice;