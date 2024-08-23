import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import QuizNavbar from '../components/QuizNavbar';
import '../css/QuizAi.css';

import { GoogleGenerativeAI } from "@google/generative-ai";



function QuizAi() {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const handleSubmit = async () => {

    setLoading(true);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
        const result = await model.generateContent(inputText);
        const response = result.response;
        const text = response.text();
        setResponseText(text);
    } catch (error) {
      console.error('Error sending request:', error);
      setResponseText('오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }





  };

  return (
    <div>
        <div className="header-container">
        <Header />  
      </div>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className='quizNavbar-container'>
        <QuizNavbar />
      </div>


      <div className='quizAi-content'>
      <h2>AI 질문하기</h2>

        <h3>질문 입력:</h3>
            <textarea
              type="text"
              id="inputText"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              required
              className="question-input"
            />
                  <button onClick={handleSubmit} className="quizAi-button">질문하기</button>

            {loading && <p>요청 처리 중...</p>}


          {responseText && (
            <div className='response-text'>
              <h2>응답 결과:</h2>
              <pre>{responseText}</pre>
            </div>
          )}
          </div>
    </div>
  );
};

export default QuizAi;
