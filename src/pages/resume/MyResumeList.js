import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../contexts/axiosInstance';
import '../../css/MyResumeList.css';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import UserMenubar from '../../components/UserMenubar';

function MyResumeList() {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const response = await axiosInstance.get('/api/v1/resumes/my');
                setResumes(response.data.data);
                console.log(response.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchResumes();
    }, []);

    const handleResumeClick = (resumeId) => {
        navigate(`/resume/${resumeId}`);
    };

    return (
        <div className="my-resume-page">
            <div className="header-container">
                <Header />
                <Navbar />
            </div>
            <div className="user-delete-content">
                <div className="user-menubar-container">
                    <UserMenubar />
                </div>
                <div className="resume-container">
                    <h2>내 이력서</h2>
                    {loading ? (
                        <p className="loading-message">로딩 중...</p>
                    ) : error ? (
                        <p className="error-message">Error fetching resumes: {error.message}</p>
                    ) : resumes.length > 0 ? (
                        <ul className="resume-list">
                            {resumes.map((resume) => (
                                <li
                                    key={resume.id}
                                    className="resume-card"
                                    onClick={() => handleResumeClick(resume.id)}
                                >
                                    <h3 className="resume-title">{resume.title}</h3>
                                    <p className="resume-date">작성일: {resume.createdAt}</p>
                                    <p className="resume-description">{resume.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-resumes-message">이력서가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyResumeList;
