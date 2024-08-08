// src/components/QuizUpdate.js

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import QuizNavbar from '../components/QuizNavbar';
import '../css/QuizCreate.css'; // Reuse the same CSS file as QuizCreate
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../contexts/axiosInstance';

function QuizUpdate() {
  const { id } = useParams(); // URL에서 id를 추출
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [updateQuiz, setUpdateQuiz] = useState(null);

  const categories = ['롤', '오버워치', '피파온라인', '스타크래프트', '기타'];

  useEffect(() => {
    // 기존 퀴즈 데이터를 가져오기
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/quizzes/get/${id}`);
        const quiz = response.data.data;
        setCategory(quiz.category);
        setTitle(quiz.title);
        setContent(quiz.content);
        setAnswer(quiz.answer);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.patch(`/api/quizzes/update/${id}`, {
        category,
        title,
        content,
        answer,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert("퀴즈가 업데이트되었습니다.");
      navigate('/quiz'); // 퀴즈가 업데이트된 후 /quiz로 이동합니다.
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생: {error}</p>;

  return (
    <div className="quiz-create-page">
      <div className="header-container">
        <Header />
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="quizNavbar-container">
        <QuizNavbar />
      </div>
      <div className="quiz-create-content">
        <h2>퀴즈 수정</h2>
        <form onSubmit={handleSubmit} className="quiz-create-form">
          <div className="quiz-create-form-group">
            <label htmlFor="quizType">퀴즈 분류:</label>
            <select
              id="quizType"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">선택하세요</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="quiz-create-form-group">
            <label htmlFor="title">퀴즈 제목:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="quiz-create-form-group">
            <label htmlFor="content">퀴즈 내용:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="quiz-create-form-group">
            <label htmlFor="answer">퀴즈 정답:</label>
            <input
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="quiz-create-submit-button" disabled={loading}>
            {loading ? '제출 중...' : '퀴즈 수정'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuizUpdate;
