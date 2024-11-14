import React, { useState, useContext } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import UserMenubar from '../../components/UserMenubar';
import '../../css/UserDelete.css';
import { AuthContext } from '../../contexts/AuthContext';
import axiosInstance from '../../contexts/axiosInstance';
import { useNavigate } from 'react-router-dom';

function UserDelete() {
    const { logout } = useContext(AuthContext);
    const [emailCheck, setEmailCheck] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleDelete = async (e) => {
        e.preventDefault(); // form submission 방지
        try {
            const response = await axiosInstance.delete('/api/v1/auth', {
                params: {
                    emailCheck: emailCheck,
                },
            });
            if (response.status === 200) {
                logout();
                navigate('/');
            } else {
                setMessage('삭제 중 문제가 발생했습니다.');
            }
        } catch (error) {
            setMessage('삭제 요청 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="user-delete-page">
            <div className="header-container">
                <Header />
                <Navbar />
            </div>
            <div className="user-delete-content">
                <div className="user-menubar-container">
                    <UserMenubar />
                </div>
                <div className="user-delete-container">
                    <h3 className="user-delete-title">계정 삭제</h3>
                    <form onSubmit={handleDelete} className="user-delete-form">
                        <div className="user-delete-info-item">
                            <input
                                type="email"
                                placeholder="이메일을 입력하세요"
                                value={emailCheck}
                                onChange={(e) => setEmailCheck(e.target.value)}
                                className="user-delete-email-input"
                            />
                        </div>
                        <button type="submit" className="user-delete-button">
                            삭제
                        </button>
                        {message && <p className="message">{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserDelete;
