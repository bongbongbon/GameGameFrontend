// src/components/QuizDetail.js

import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import QuizNavbar from '../components/QuizNavbar';
import '../css/QuizDetail.css';
import axiosInstance from '../contexts/axiosInstance';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext


function QuizDetail() {
  const { id } = useParams(); // URL에서 id를 추출
  const [quiz, setQuiz] = useState(null); // 퀴즈 상세 정보를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [submittedAnswer, setSubmittedAnswer] = useState(''); // 사용자가 제출한 답변
  const navigate = useNavigate(); // useNavigate 훅을 호출합니다.
  const { user } = useContext(AuthContext); // AuthContext를 사용하여 사용자 정보를 가져옵니다.



  useEffect(() => {
    // 데이터 가져오기
    const fetchQuiz = async () => {
      try {
        const response = await axiosInstance.get(`/api/quizzes/get/${id}`);
        setQuiz(response.data.data);
      } catch (error) {
        setError(error.message); // 오류 상태 업데이트
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchQuiz(); // 데이터 가져오기 호출
  }, [id]); // id가 변경될 때마다 실행

  const handleAnswerSubmit = async () => {

    if (!user) { // 사용자 인증 확인
      alert('로그인이 필요한 기능입니다.');
      navigate('/login'); // 로그인 페이지로 리디렉션
      return;
    }

    try {
      const response = await axiosInstance.post(`/api/quizzes/checkAnswer`, {
        quizId: id,
        userAnswer: submittedAnswer
      });

      if (response.data.data === true) {
        alert("정답입니다.");
        navigate("/quiz");
      } else {
        alert("틀렸습니다.");
      }
    } catch (error) {
      setError(error.message); // 오류 상태 업데이트
    }
  };

  const handleEdit = () => {
    navigate(`/quiz/update/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/quizzes/delete/${id}`);
        alert("삭제되었습니다.");
        navigate("/quiz/myquizzes");
      } catch (error) {
        setError(error.message); // 오류 상태 업데이트
      }
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;
  if (!quiz) return <p>퀴즈 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="quiz-detail-page">
      <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className='quizNavbar-container'>
        <QuizNavbar />
      </div>
      <div className='quiz-detail-content'>
      <div className='quiz-detail-card'>
            <div className='quiz-container'>
            <div className="category-views-container">
              <p>카테고리: {quiz.category}</p>
              <p>조회수: {quiz.views}</p>
            </div>
              <h1>질문: {quiz.content}</h1>
            </div>
        </div>
      <div className="answer-container">
        <input
          type="text"
          placeholder="정답을 입력하세요"
          value={submittedAnswer}
          onChange={(e) => setSubmittedAnswer(e.target.value)}
        />
        <button
          className="answer-button"
          onClick={handleAnswerSubmit}
        >
          정답 제출
        </button>
        {user === quiz.username && ( // 현재 사용자와 퀴즈 소유자를 비교합니다.
          <div className="edit-delete-container">
            <button onClick={handleEdit} className="edit-button">
              수정
            </button>
            <button onClick={handleDelete} className="delete-button">
              삭제
            </button>
          </div>
        )}
      </div>
        </div>
    </div>
  );
}

export default QuizDetail;
