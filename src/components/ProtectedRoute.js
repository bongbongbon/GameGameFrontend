import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    alert('로그인이 필요한 페이지입니다.');
    return <Navigate to="/login" />;
}

  return element;
};

export default ProtectedRoute;