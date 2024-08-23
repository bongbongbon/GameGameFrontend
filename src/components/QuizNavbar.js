import React from 'react';
import '../css/QuizNavbar.css';
import { Link } from 'react-router-dom';

function QuizNavbar() {

  return (
        <nav className="quiz-navbar">
          <ul className="quiz-navbar-list">
            <li className="quiz-navbar-item">
              <Link to="/quiz">
                전체퀴즈
              </Link>
            </li>
            <li className="quiz-navbar-item">
              <Link
                to="/quiz/create">
                퀴즈만들기
              </Link>
            </li>
            <li className="quiz-navbar-item">
              <Link
                to="/quiz/myresults">
                내퀴즈 결과
              </Link>
            </li>
            <li className="quiz-navbar-item">
              <Link
                to="/quiz/myquizzes">
                내가 만든 퀴즈
              </Link>
            </li>
            <li className="quiz-navbar-item">
              <Link
                to="/quiz/ai">
                AI 질문하기
              </Link>
            </li>
 
          </ul>
        </nav>
  );
}

export default QuizNavbar;
