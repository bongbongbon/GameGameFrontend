import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import '../../css/TeamDetail.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../contexts/axiosInstance';


function TeamDetail() {
    const { id } = useParams(); // URL에서 id를 추출
    const [team, setTeam] = useState(); // 팀 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axiosInstance.get(`/api/v1/teams/${id}`);
                setTeam(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                setError(error.message); // 오류 상태 업데이트
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchTeam(); // 데이터 가져오기 호출
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            if (team) { // team 데이터가 존재하는 경우에만 fetchUser 호출
                try {
                    const response = await axiosInstance.get(`/api/v1/auth/${team.userId}`);
                    setUser(response.data.data);
                    console.log(response.data.data);
                } catch (error) {
                    setError(error.message); // 오류 상태 업데이트
                } finally {
                    setLoading(false); // 로딩 완료
                }
            }
        };

        fetchUser(); // 데이터 가져오기 호출
    }, [team]); // team이 변경될 때만 실행

    if (loading) return <div className="loading">로딩 중...</div>;
    if (error) return <div className="error">오류: {error}</div>;
    if (!team) return <div className="no-team">팀 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="team-page">
            <div className="header-container">
                <Header />
            </div>
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className="team-detail-container">
                <div className="team-detail">
                    <div className="team-image-container">
                        <img src="https://picsum.photos/1300/300" alt="Team" />
                    </div>
                    <div className="team-info">
                        <p>도메인: {team.domain}</p>
                        <p>모집 기간: {team.recruitmentStartDate} - {team.recruitmentEndDate}</p>
                        <p>프로젝트 기간: {team.recruitmentStartDate} - {team.recruitmentEndDate}</p>
                        <p>팀원 수: {team.memberNumber}명</p>
                        <h2>{team.title}</h2>
                        <p>{team.description}</p>
                        <button className="apply-button">지원하기</button>
                    </div>
                </div>
                <div className="team-detail-user-profile">
                    <h3>프로필 정보</h3>
                    {user ? (
                        <div className="team-detail-profile-details">
                            <p>{user.nickName}</p>
                            <p>{user.email}</p>
                            <p>{user.phoneNumber}</p>
                            {/* Add more profile information if needed */}
                        </div>
                    ) : (
                        <p>로그인이 필요합니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TeamDetail;
