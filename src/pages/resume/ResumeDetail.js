import React, { useState, useEffect, useCallback } from 'react';
import '../../css/ResumeDetail.css';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import UserMenubar from '../../components/UserMenubar';
import axiosInstance from '../../contexts/axiosInstance';
import { useParams } from 'react-router-dom';

function ResumeDetail() {
    const { resumeId } = useParams(); 
    const [title, setTitle] = useState(''); 
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [careers, setCareers] = useState([]);
    // const [isEditMode, setIsEditMode] = useState(true); 

    const jobOptions = [
        '웹 백엔드',
        '웹 프론트엔드',
        'iOS',
        '안드로이드',
        '하이브리드 앱',
        '게임 개발',
        '기타'
    ];



    const fetchResume = useCallback(async () => {
      try {
          const response = await axiosInstance.get(`/api/v1/resumes/${resumeId}`);
          const { title, selectedJobs, careerResponses } = response.data.data;
          setTitle(title || '');
          setSelectedJobs(selectedJobs || []);
          setCareers(careerResponses || []);
      } catch (error) {
          console.error('Error fetching resume:', error);
      }
  }, [resumeId]);

  useEffect(() => {
    fetchResume();
}, [fetchResume]);

    const handleJobChange = (job) => {
        if (selectedJobs.includes(job)) {
            setSelectedJobs(selectedJobs.filter((selectedJob) => selectedJob !== job));
        } else {
            setSelectedJobs([...selectedJobs, job]);
        }
    };

    const addCareer = () => {
        setCareers([...careers, { company: '', position: '', department: '', job: '', startDate: '', endDate: '', description: '' }]);
    };

    const removeCareer = (index) => {
        setCareers(careers.filter((_, i) => i !== index));
    };

    const handleCareerChange = (index, field, value) => {
        const updatedCareers = [...careers];
        updatedCareers[index][field] = value;
        setCareers(updatedCareers);
    };

    const handleUpdate = async () => {
        const requestData = {
            title, 
            selectedJobs,
            careerUpdateRequests: careers.map((career) => ({
                id: career.id,
                company: career.company,
                position: career.position,
                department: career.department,
                job: career.job,
                startDate: career.startDate,
                endDate: career.endDate,
                description: career.description
            }))
        };

        try {
            const response = await axiosInstance.patch(`/api/v1/resumes/${resumeId}`, requestData);
            console.log('Resume updated successfully:', response.data);
            fetchResume(); 
        } catch (error) {
            console.error('Error updating resume:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axiosInstance.delete(`/api/v1/resumes/${resumeId}`);
            console.log('Resume deleted successfully:', response.data);
            setTitle('');
            setSelectedJobs([]);
            setCareers([]);
        } catch (error) {
            console.error('Error deleting resume:', error);
        }
    };

    return (
        <div className="resume-detail-page">
            <div className="header-container">
                <Header />
                <Navbar />
            </div>
            <div className="user-delete-content">
                <div className="user-menubar-container">
                    <UserMenubar />
                </div>
                <div className="resume-content">
                    <h3 className="resume-job-title">이력서 제목</h3>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="resume-title-input"
                        placeholder="이력서 제목을 입력하세요"
                    />

                    <h3 className="resume-job-title">직군 선택</h3>
                    <div className="job-selection-container">
                        {jobOptions.map((job) => (
                            <label key={job} className="job-option">
                                <input
                                    type="checkbox"
                                    checked={selectedJobs.includes(job)}
                                    onChange={() => handleJobChange(job)}
                                />
                                {job}
                            </label>
                        ))}
                    </div>

                    <hr />

                    <h3 className="resume-career-title">경력</h3>
                    <button type="button" onClick={addCareer} className="add-career-button">경력 추가</button>

                    {careers.map((career, index) => (
                        <div key={index} className="career-entry">
                            <input
                                type="text"
                                placeholder="회사명"
                                value={career.company}
                                onChange={(e) => handleCareerChange(index, 'company', e.target.value)}
                                className="career-input"
                            />
                            <input
                                type="text"
                                placeholder="직책"
                                value={career.position}
                                onChange={(e) => handleCareerChange(index, 'position', e.target.value)}
                                className="career-input"
                            />
                            <input
                                type="text"
                                placeholder="부서명"
                                value={career.department}
                                onChange={(e) => handleCareerChange(index, 'department', e.target.value)}
                                className="career-input"
                            />
                            <input
                                type="text"
                                placeholder="직무"
                                value={career.job}
                                onChange={(e) => handleCareerChange(index, 'job', e.target.value)}
                                className="career-input"
                            />
                            <input
                                type="date"
                                placeholder="시작 날짜"
                                value={career.startDate}
                                onChange={(e) => handleCareerChange(index, 'startDate', e.target.value)}
                                className="career-input"
                            />
                            <input
                                type="date"
                                placeholder="종료 날짜"
                                value={career.endDate}
                                onChange={(e) => handleCareerChange(index, 'endDate', e.target.value)}
                                className="career-input"
                            />
                            <textarea
                                placeholder="내용"
                                value={career.description}
                                onChange={(e) => handleCareerChange(index, 'description', e.target.value)}
                                className="career-description"
                            />
                            <button type="button" onClick={() => removeCareer(index)} className="remove-career-button">삭제</button>
                        </div>
                    ))}

                    <div className="button-container">
                        <button type="button" onClick={handleUpdate} className="save-button">수정</button>
                        <button type="button" onClick={handleDelete} className="delete-button">이력서 삭제</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResumeDetail;
