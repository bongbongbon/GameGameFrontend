import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import TeamNavbar from '../../components/TeamNavbar';
import '../../css/Team.css'

const mockData = [
  { title: "팀 프로젝트 1", description: "설명 1" },
  { title: "팀 프로젝트 2", description: "설명 2" },
  { title: "팀 프로젝트 3", description: "설명 3" },
  { title: "팀 프로젝트 4", description: "설명 4" },
  { title: "팀 프로젝트 5", description: "설명 5" },
  { title: "팀 프로젝트 6", description: "설명 6" },
  { title: "팀 프로젝트 7", description: "설명 7" },
  { title: "팀 프로젝트 8", description: "설명 8" },
  { title: "팀 프로젝트 9", description: "설명 9" },
  { title: "팀 프로젝트 10", description: "설명 10" },
  { title: "팀 프로젝트 10", description: "설명 11" },
  { title: "팀 프로젝트 10", description: "설명 12" },
  { title: "팀 프로젝트 10", description: "설명 13" },

  // ... (더 많은 항목 추가 가능)
];

function TeamDetail() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate the total number of pages
  const totalPages = Math.ceil(mockData.length / itemsPerPage);

  // Get current items based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="team-page">
      <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className='teamNavbar-container'>
        <TeamNavbar />
      </div>
      
      <div className="team-content">
        <div className='team-container'>
          <h2>전체 팀</h2>        
        <div className="team-list">
          {currentItems.map((item, index) => (
            <div key={index} className="team-card">
              <h3 className="team-card-title">{item.title}</h3>
              <p className="team-card-description">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
        <button
            className="page-button"
          >
            처음
          </button>
          <button
            className="page-button"
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={`page-tile ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </div>
          ))}
                  <button
            className="page-button"
          >
            다음
          </button>
          <button
            className="page-button"
          >
            마지막
          </button>
        </div>

      </div>
    </div>
    </div>
  );
}

export default TeamDetail;
