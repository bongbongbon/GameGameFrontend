import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import TeamNavbar from '../../components/TeamNavbar';
import '../../css/TeamCreate.css';

function TeamCreate() {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 팀 저장 로직 추가 가능
    console.log({ teamName, description });
  };

  return (
    <div className="team-create-page">
      <div className="header-container">
        <Header />
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="teamNavbar-container">
        <TeamNavbar />
      </div>
      
      <div className="team-create-form">
        <form onSubmit={handleFormSubmit}>
          <h2>팀 생성</h2>
          <label>
            팀 이름:
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="팀 이름을 입력하세요"
              required
            />
          </label>
          <label>
            설명:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="팀 설명을 입력하세요"
            />
          </label>
          <button type="submit" className="team-create-button">팀 생성</button>
        </form>
      </div>
    </div>
  );
}

export default TeamCreate;
