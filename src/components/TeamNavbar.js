import React, { useState } from 'react';
import '../css/TeamNavbar.css';
import { Link } from 'react-router-dom';

function TeamNavbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("최신순");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm);
    // 검색 로직 추가 가능
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    console.log("Sort option selected:", event.target.value);
    // 정렬 로직 추가 가능
  };

  return (
    <nav className="team-navbar">
      <ul className="team-navbar-list">
        <li className="team-navbar-item">
          <Link to="/team">전체 팀</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/team/sidejob">사이드잡</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/team/shortproject">단기 프로젝트</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/team/competition">공모전</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/team/hackathon">해커톤</Link>
        </li>
      </ul>
      <form onSubmit={handleSearchSubmit} className="team-search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색어 입력"
          className="team-search-input"
        />
        <button type="submit" className="team-search-button">검색</button>
      </form>
      <select value={sortOption} onChange={handleSortChange} className="team-sort-select">
        <option value="최신순">최신순</option>
        <option value="오래된순">오래된순</option>
        <option value="인기순">인기순</option>
      </select>
    </nav>
  );
}

export default TeamNavbar;
