import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../contexts/axiosInstance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // 로그인 함수
  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', { email, password });
      const token = response.data.data.accessToken;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (error) {
      throw error;
    }
  };

  // 회원가입 함수
  const signup = async (email, password, passwordCheck, nickName, phoneNumber, userRole) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/signUp', {
        email,
        password,
        passwordCheck,
        nickName,
        phoneNumber,
        userRole,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchUser = async() => {
    if(token) {
      try {
        const response = await axiosInstance.get(`/api/v1/auth`);
        setUser(response.data.data);
        console.log(response.data.data);
    } catch (error) {
        setError(error.message); // 오류 상태 업데이트
    } finally {
        setLoading(false); // 로딩 완료
    }
    }
  };

    // 초기화: token이 있을 경우 유저 정보 가져오기
    useEffect(() => {
      if (token) {
        fetchUser(token);
      } else {
        setLoading(false);
      }
    }, [token]);


  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
