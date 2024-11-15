import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import TeamNavbar from '../../components/TeamNavbar';
import '../../css/TeamCreate.css';
import axiosInstance from '../../contexts/axiosInstance';

function TeamCreate() {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [memberNumber, setMemberNumber] = useState(1);
  const [domain, setDomain] = useState("");
  const [teamCategory, setTeamCategory] = useState("SIDE_JOB");
  const [recruitmentStartDate, setRecruitmentStartDate] = useState("");
  const [recruitmentEndDate, setRecruitmentEndDate] = useState("");
  const [projectStartDate, setProjectStartDate] = useState("");
  const [projectEndDate, setProjectEndDate] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate hook 초기화

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/v1/teams', {
        title: teamName,
        description,
        memberNumber,
        domain,
        teamCategory,
        recruitmentStartDate,
        recruitmentEndDate,
        projectStartDate,
        projectEndDate
      });
      console.log('Team created successfully:', response.data);
      navigate('/team'); // 성공 후 /team 페이지로 리디렉션
    } catch (err) {
      console.error('Failed to create team:', err);
      setError("팀 생성에 실패했습니다. 다시 시도해주세요.");
    }
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
          <label>
            팀원 수:
            <input
              type="number"
              value={memberNumber}
              onChange={(e) => setMemberNumber(e.target.value)}
              required
            />
          </label>
          <label>
            도메인:
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="프로젝트 도메인을 입력하세요"
            />
          </label>
          <label>
            카테고리:
            <select
              value={teamCategory}
              onChange={(e) => setTeamCategory(e.target.value)}
              required
            >
              <option value="SIDE_JOB">사이드잡</option>
              <option value="SHORT_PROJECT">단기 프로젝트</option>
              <option value="COMPETITION">공모전</option>
              <option value="HACKATHON">해커톤</option>
              <option value="STUDY">스터디</option>
            </select>
          </label>
          <label>
            모집 시작 날짜:
            <input
              type="date"
              value={recruitmentStartDate}
              onChange={(e) => setRecruitmentStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            모집 종료 날짜:
            <input
              type="date"
              value={recruitmentEndDate}
              onChange={(e) => setRecruitmentEndDate(e.target.value)}
              required
            />
          </label>
          <label>
            프로젝트 시작 날짜:
            <input
              type="date"
              value={projectStartDate}
              onChange={(e) => setProjectStartDate(e.target.value)}
              required
            />
          </label>
          <label>
            프로젝트 종료 날짜:
            <input
              type="date"
              value={projectEndDate}
              onChange={(e) => setProjectEndDate(e.target.value)}
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="team-create-button">팀 생성</button>
        </form>
      </div>
    </div>
  );
}

export default TeamCreate;
