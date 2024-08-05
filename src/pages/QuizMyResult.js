import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import QuizNavbar from '../components/QuizNavbar';
import '../css/Quiz.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../contexts/axiosInstance';

function QuizMyResult() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const resultsPerPage = 12;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get('/api/quizzes/myResult', {
          params: {
            page: currentPage - 1, // Spring Data JPA는 0부터 시작합니다.
            size: resultsPerPage,
          }
        });
        if (response.data && response.data.data) {
            setResults(response.data.data.content);
            setTotalPages(response.data.data.totalPages || 1);
        } else {
          setResults([]);
          setTotalPages(1);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="quiz-page">
      <div className="header-container">
        <Header />
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="quizNavbar-container">
        <QuizNavbar />
      </div>

      <div className="quiz-content">
        {loading && <p className="loading-message">로딩 중...</p>}
        {error && <p className="error-message">오류 발생: {error}</p>}

        {!loading && !error && results.length > 0 && (
          <div className="quiz-list">
            {results.map(result => (
              <div className="quiz-card" key={result.id}>
                <Link to={`/quiz/get/${result.quizResponse.id}`} className="quiz-link">
                  <span>{result.quizResponse.category}</span>
                  <h3>{result.quizResponse.title}</h3>
                  <p>{result.quizResponse.content}</p>
                  <p>내가 쓴 답: {result.userAnswer || '답 없음'}</p>
                  <p>퀴즈결과: {result.isCorrect ? "맞힌문제" : "틀린문제"}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && results.length === 0 && (
          <p className="no-quizzes-message">퀴즈가 없습니다.</p>
        )}

        <div className="pagination">
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            처음
          </button>
          <button
            className="page-button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="page-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            다음
          </button>
          <button
            className="page-button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            마지막
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizMyResult;
