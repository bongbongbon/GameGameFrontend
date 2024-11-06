import React from 'react';
import '../css/TeamNavbar.css';

function TeamNavbar({ searchTerm, setSearchTerm, sortOption, setSortOption, onSearch }) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(); // 검색 버튼 클릭 시 검색 실행
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
            <a href="/team">전체 팀</a>
            </li>
            <li className="team-navbar-item">
            <a href="/team/sidejob">사이드잡</a>
            </li>
            <li className="team-navbar-item">
            <a href="/team/shortproject">단기 프로젝트</a>
            </li>
            <li className="team-navbar-item">
            <a href="/team/competition">공모전</a>
            </li>
            <li className="team-navbar-item">
            <a href="/team/hackathon">해커톤</a>
            </li>
            <li className="team-navbar-item">
            <a href="/team/study">스터디</a>
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
        <option value="이름순">이름순</option>
      </select>
    </nav>
  );
}

export default TeamNavbar;
