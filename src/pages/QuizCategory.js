import Navbar from '../components/Navbar';
import Header from '../components/Header';
import QuizNavbar from '../components/QuizNavbar';
import '../css/Quiz.css';



function QuizCategory() {




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


          <div className="quiz-list">
                    <div className="quiz-card">
                        <h3>롤</h3>
                        <p>문제 갯수: </p>
                    </div>
                    <div className="quiz-card">
                        <h3>오버워치</h3>
                        <p>문제 갯수: </p>
                    </div>
                    <div className="quiz-card">
                        <h3>피파온라인</h3>
                        <p>문제 갯수: </p>
                    </div>
                    <div className="quiz-card">
                        <h3>스타크래프트</h3>
                        <p>문제 갯수: </p>
                    </div>
                    <div className="quiz-card">
                        <h3>기타</h3>
                        <p>문제 갯수: </p>
                    </div>
          </div>    
      </div>
    </div>
  );
}

export default QuizCategory;
