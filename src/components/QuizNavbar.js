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
                to="/quiz/category">
                분류퀴즈
              </Link>
            </li>
            <li className="quiz-navbar-item">
              <Link
                to="/quiz/myresult">
                내퀴즈 결과
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
                to="/quiz/update">
                퀴즈수정
              </Link>
            </li>
            <li className="quiz-navbar-item">
              <Link
                to="/quiz/delete">
                퀴즈삭제
              </Link>
            </li>
 
          </ul>
        </nav>
  );
}

export default QuizNavbar;
