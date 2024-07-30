import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import QuizNavbar from '../components/QuizNavbar';
import '../css/QuizCreate.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 import합니다.
import axiosInstance from '../contexts/axiosInstance';



function QuizCreate() {

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = ['롤', '오버워치', '피파온라인', '스타크래프트', '기타'];
    const navigate = useNavigate(); // useNavigate 훅을 호출합니다.

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/quizzes/create', {
                category,
                title,
                content,
                answer
            },  {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert("퀴즈가 생성되었습니다.")
            navigate('/quiz'); // 퀴즈가 생성된 후 /quiz로 이동합니다.
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
            alert(error.response.data.message)
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="quiz-create-page">
      <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className='quizNavbar-container'>
        <QuizNavbar />
      </div>
      <div className="quiz-create-content">
        <h2>퀴즈 만들기</h2>
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
                        {loading ? '제출 중...' : '퀴즈 제출'}
                    </button>
        </form>
      </div>
    </div>
  );
}

export default QuizCreate;
