import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../contexts/axiosInstance';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import TeamNavbar from '../../components/TeamNavbar';
import '../../css/Team.css';
import { Link } from 'react-router-dom';

function TeamHackathon() {
  const [teams, setTeams] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [totalElements, setTotalElements] = useState(); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOption, setSortOption] = useState("최신순"); 
  const teamsPerPage = 9; 
  const maxPageButtons = 10; // 한 번에 표시할 최대 페이지 버튼 수

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get('/api/v1/teams/search', {
        params: {
          teamCategory: "HACKATHON",
          page: currentPage, 
          size: teamsPerPage,
          searchTerm: searchTerm, 
          sortOption: sortOption,
        }
      });

      if (response.data && response.data.data) {
        setTeams(Array.isArray(response.data.data.content) ? response.data.data.content : []);
        setTotalPages(response.data.data.page.totalPages);
        setTotalElements(response.data.data.page.totalElements);
      } else {
        setTeams([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, sortOption]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); 
    fetchTeams(); 
  };

  useEffect(() => {
    fetchTeams();
  }, [currentPage, sortOption, fetchTeams]);

  const startPage = Math.floor((currentPage - 1) / maxPageButtons) * maxPageButtons + 1;
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  return (
    <div className="team-page">
      <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className='teamNavbar-container'>
        <TeamNavbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          sortOption={sortOption}
          setSortOption={setSortOption}
          onSearch={handleSearch} 
        />
      </div>
      
      <div className="team-content">
        <div className='team-container'>
          <h2>해커톤</h2>        
          <p>{totalElements} 개의 팀이 검색되었습니다.</p>

          {/* Display error message if there's an error */}
          {error && <p className="error-message">오류 발생: {error}</p>}

          <div className="team-list">
            {loading ? (
              <p className='loading-message'>로딩 중...</p>
            ) : teams.length === 0 ? (
              <p className="no-teams-message">팀이 없습니다.</p>
            ) : (
              teams.map(team => (
                <div className="team-card" key={team.id}>
                  <Link to={`/team/${team.id}`} className="team-link">
                    <span className="team-category">{team.teamCategory}</span>
                    <p className="team-domain">{team.domain}</p>
                    <h3 className="team-title">{team.title}</h3>
                    <p className="team-description">{team.description}</p>
                    <p className="team-member-number">팀원 수: {team.memberNumber}명</p>
                    <p className="team-recruitment">모집 기간: <strong>{team.recruitmentStartDate} - {team.recruitmentEndDate}</strong></p>
                    <p className="team-project">프로젝트 기간: <strong>{team.projectStartDate} - {team.projectEndDate}</strong></p>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="pagination">
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            처음
          </button>
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            이전
          </button>

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <button
              key={startPage + i}
              className={`page-button ${currentPage === startPage + i ? 'active' : ''}`}
              onClick={() => handlePageChange(startPage + i)}
            >
              {startPage + i}
            </button>
          ))}

          <button
            className="page-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            다음
          </button>
          <button
            className="page-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            마지막
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamHackathon;
