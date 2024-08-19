import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import QuizNavbar from '../components/QuizNavbar';
import '../css/Quiz.css';
import { Link } from 'react-router-dom'; // Link 추가
import axiosInstance from '../contexts/axiosInstance';


function Quiz() {
  const [quizzes, setQuizzes] = useState([]); // 퀴즈 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const quizzesPerPage = 12; // 페이지 당 퀴즈 수

  useEffect(() => {
    // 데이터 가져오기
    const fetchQuizzes = async () => {
      try {
        const response = await axiosInstance.get('/api/quizzes/getAll', {
          params: {
            page: currentPage - 1, // Spring Data JPA는 0부터 시작합니다.
            size: quizzesPerPage
          }
        });

        // 서버 응답 로그 출력
        console.log(response.data.data);

        // 데이터 검증 및 상태 업데이트
        if (response.data && response.data.data) {
          setQuizzes(Array.isArray(response.data.data.content) ? response.data.data.content : []);
          setTotalPages(response.data.data.page.totalPages || 1);
        } else {
          setQuizzes([]);
          setTotalPages(1);
        }
      } catch (error) {
        setError(error.message); // 오류 상태 업데이트
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchQuizzes(); // 데이터 가져오기 호출
  }, [currentPage]); // currentPage가 변경될 때마다 실행

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
      <div className='quizNavbar-container'>
        <QuizNavbar />
      </div>
      
      <div className="quiz-content">
        
        {loading && <p className="loading-message">로딩 중...</p>}
        {error && <p className="error-message">오류 발생: {error}</p>}

        {!loading && !error && quizzes.length > 0 && (
          <div className="quiz-list">
            {quizzes.map(quiz => (
              <div className="quiz-card" key={quiz.id}>
                <Link to={`/quiz/get/${quiz.id}`} className="quiz-link">
                  <span>{quiz.category}</span>
                  <h3>{quiz.title}</h3>
                  <p>{quiz.content}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && quizzes.length === 0 && (
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

export default Quiz;
