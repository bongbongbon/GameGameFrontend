import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';


// 공지사항 페이지
import Notice from './pages/Notice';

// 퀴즈 페이지
import Quiz from './pages/Quiz';
import QuizCreate from './pages/QuizCreate';
import QuizDetail from './pages/QuizDetail';
import QuizCategory from './pages/QuizCategory';
import Login from './pages/Login';

// 게임게시판 페이지
import Board from './pages/Board';

function App() {
  return (
  <AuthProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path='/login' element={<Login />} />


            <Route path="/notice" element={<Notice />} />

            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/create" element={<QuizCreate />} />
            <Route path="/quiz/get/:id" element={<QuizDetail />} />
            <Route path="/quiz/category" element={<QuizCategory />} />


            <Route path="/board" element={<Board />} />
        </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
