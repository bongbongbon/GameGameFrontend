import React, { useState } from 'react';
import '../css/NoticeNavbar.css';

function NoticeNavbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("최신순");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchTerm, "with sort:", sortOrder);
    // 검색 및 정렬 로직 추가 가능
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    console.log("Selected sort order:", event.target.value);
  };

  return (
    <nav className="notice-navbar">
      <form onSubmit={handleSearchSubmit} className="notice-form">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색어를 입력하세요"
          className="notice-search-input"
        />
        <button type="submit" className="notice-search-button">검색</button>
        
        <select value={sortOrder} onChange={handleSortChange} className="notice-sort-select">
          <option value="최신순">최신순</option>
          <option value="오래된순">오래된순</option>
          <option value="인기순">인기순</option>
          <option value="조회순">조회순</option>
        </select>
      </form>
    </nav>
  );
}

export default NoticeNavbar;
