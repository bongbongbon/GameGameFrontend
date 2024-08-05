// src/contexts/AuthContext.js

import React, { createContext, useState } from 'react';
import axiosInstance from '../contexts/axiosInstance';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      await getCurrentUser(response.data.token);
    } catch (error) {
      throw error;
    }
  };


  const getCurrentUser = async (token) => {
    try {
      const response = await axiosInstance.post('/api/auth/me', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/'; // 로그인 페이지로 리다이렉트
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };