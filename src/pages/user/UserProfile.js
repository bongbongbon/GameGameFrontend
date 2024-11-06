import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import '../../css/UserProfile.css';
import { AuthContext } from '../../contexts/AuthContext';
import UserMenubar from '../../components/UserMenubar';
import axiosInstance from '../../contexts/axiosInstance';

function UserProfile() {
    const { user } = useContext(AuthContext);
    const [nickName, setNickName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (user) {
            setNickName(user.nickName || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber || '');
        }
    }, [user]);

    const handleSave = async (e) => {
        e.preventDefault(); // form submission 방지
        try {
            const response = await axiosInstance.patch('/api/v1/auth/profile', {
                email,
                nickName,
                phoneNumber,
            });
            alert('프로필 정보가 수정되었습니다.');
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div className="user-profile-page">
            <div className="header-container">
                <Header />
                <Navbar />
            </div>
            <div className="user-profile-content">
                <div className="user-menubar-container">
                    <UserMenubar />
                </div>
                <div className="user-profile-container">
                    <h3 className="profile-title">프로필</h3>
                    <form onSubmit={handleSave} className="profile-form">
                        <div className="user-profile-details">
                            <img
                                src={user?.profilePicture || 'default-profile.png'}
                                alt="Profile"
                                className="profile-picture"
                            />
                            <div className="profile-info-list">
                                <div className="profile-info-item">
                                    <label>닉네임</label>
                                    <input
                                        type="text"
                                        value={nickName}
                                        onChange={(e) => setNickName(e.target.value)}
                                        className="profile-input"
                                    />
                                </div>
                                <div className="profile-info-item">
                                    <label>이메일 (수정 불가)</label>
                                    <input
                                        type="email"
                                        value={email}
                                        readOnly
                                        className="profile-input"
                                    />
                                </div>
                                <div className="profile-info-item">
                                    <label>전화번호</label>
                                    <input
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="profile-input"
                                    />
                                </div>
                                <button type="submit" className="profile-save-button">저장</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
