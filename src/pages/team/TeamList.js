import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../contexts/axiosInstance';
import '../../css/TeamList.css';
import { Link } from 'react-router-dom';

function TeamList() {
  const [teams, setTeams] = useState([]); // 팀 목록을 저장할 상태
  const currentPage = 1; // 현재 페이지 번호
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 메시지
  const teamsPerPage = 3; // 페이지당 팀 수

  // 팀 목록을 가져오는 함수
  const fetchTeams = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/v1/teams/search', {
        params: {
          page: currentPage, 
          size: teamsPerPage,
        }
      });

      if (response.data && response.data.data) {
        setTeams(Array.isArray(response.data.data.content) ? response.data.data.content : []);
      } else {
        setTeams([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);


  // `useEffect`로 데이터 초기 로딩 및 페이지/정렬 변경 시 데이터 불러오기
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return (
    <div className="team-page">
      <div className="team-content">
        <div className='team-container'>
          <div className="team-header">
            <h2 className="team-header-title">팀 모집공고</h2>        
            <Link to='/team' className="more-link">더보기 &gt;</Link>
          </div>

          {/* 로딩 및 팀 목록 표시 */}
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

          {/* 에러 메시지 표시 */}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default TeamList;
