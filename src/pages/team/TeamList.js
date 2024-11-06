import React, { useState, useEffect } from 'react';
import axiosInstance from '../../contexts/axiosInstance';
import '../../css/TeamList.css';
import { Link } from 'react-router-dom';

function TeamList() {
  const [teams, setTeams] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const [totalElements, setTotalElements] = useState(); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortOption, setSortOption] = useState("최신순"); 
  const teamsPerPage = 3; 


  const fetchTeams = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/teams/search', {
        params: {
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
  };

  const handlePageChange = (pageNumber) => {
      // Ensure the page number stays within the valid range
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
  }, [currentPage, sortOption]); 



  return (
    <div className="team-page">
      
      <div className="team-content">
        <div className='team-container'>
            <div className="team-header">
                <h2 className="team-header-title">팀 모집공고</h2>        
                <Link to='/team' className="more-link">더보기 &gt;</Link>
            </div>
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
      </div>
    </div>
  );
}

export default TeamList;
