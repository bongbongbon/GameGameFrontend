import React, { useState } from 'react';
import '../css/TeamNavbar.css';
import { Link } from 'react-router-dom';

function MemberNavbar() {
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
          <Link to="/member">전체 멤버</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/member/webfront">웹 프론트</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/member/webbackend">웹 백엔드</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/member/ios">IOS</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/member/android">안드로이드</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/member/hybridapp">하이브리드 앱</Link>
        </li>
        <li className="team-navbar-item">
          <Link to="/member/gamedevelopment">게임 개발</Link>
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

export default MemberNavbar;
