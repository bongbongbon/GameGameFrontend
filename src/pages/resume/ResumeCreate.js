import React, { useState } from 'react';
import '../../css/ResumeCreate.css';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import UserMenubar from '../../components/UserMenubar';
import axiosInstance from '../../contexts/axiosInstance';

function ResumeCreate() {
    const [resumeTitle, setResumeTitle] = useState('');
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [careers, setCareers] = useState([]);

    const jobOptions = [
        '웹 백엔드',
        '웹 프론트엔드',
        'iOS',
        '안드로이드',
        '하이브리드 앱',
        '게임 개발',
        '기타'
    ];

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
        const updatedCareers = careers.filter((_, i) => i !== index);
        setCareers(updatedCareers);
    };

    const handleCareerChange = (index, field, value) => {
        const updatedCareers = [...careers];
        updatedCareers[index][field] = value;
        setCareers(updatedCareers);
    };

    // 저장 버튼 핸들러
    const handleSave = async () => {
        console.log("Resume Title:", resumeTitle);
        console.log("Selected Jobs:", selectedJobs);
        console.log("Careers:", careers);

        const requestData = {
            title: resumeTitle,
            selectedJobs: selectedJobs,
            careerCreateRequests: careers.map((career) => ({
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
            const response = await axiosInstance.post('/api/v1/resumes', requestData);
            console.log('Resume created successfully:', response.data);
        } catch (error) {
            console.error('Error creating resume:', error);
        }
    };

    return (
        <div className="resume-create-page">
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
                        placeholder="이력서 제목을 입력하세요"
                        value={resumeTitle}
                        onChange={(e) => setResumeTitle(e.target.value)}
                        className="resume-title-input"
                    />

                    <hr />

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
                        <button type="button" onClick={handleSave} className="save-button">저장</button>
                    </div>               
                </div>
            </div>
        </div>
    );
}

export default ResumeCreate;
