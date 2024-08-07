// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../contexts/axiosInstance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async (token) => {
      try {
        const response = await axiosInstance.post('/api/auth/me', {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw error;
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/'; // 로그인 페이지로 리다이렉트
  };

  // 새로고침 시에 로그인과 회원가입 버튼이 잠깐씩 보이는 문제는, user 상태가 로드되기 전에 렌더링이 이루어지기 때문입니다.
  // 이 문제를 해결하기 위해 로딩 상태를 추가하고, user 상태가 null이 아닌지 확인한 후에 렌더링을 하도록 수정할 수 있습니다.
  

  if (loading) {
    return null; // 새로고침 하면 로그인 회원가입 버튼이 왔다갔다하는 현상 때문에 설정
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };