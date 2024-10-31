import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


// 공지사항 페이지
import Notice from './pages/Notice';

// 유저 페이지
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// 퀴즈 페이지
import Quiz from './pages/Quiz';
import QuizAi from './pages/QuizAi';
import QuizCreate from './pages/QuizCreate';
import QuizDetail from './pages/QuizDetail';
import QuizUpdate from './pages/QuizUpdate';
import QuizCategory from './pages/QuizCategory';
import QuizMyResults from './pages/QuizMyResults';
import QuizMyQuizzes from './pages/QuizMyQuizzes';

// 팀 게시판
import Team from './pages/team/Team';
import Sidejob from './pages/team/Sidejob';
import ShortProject from './pages/team/ShortProject';
import Competition from './pages/team/Competition';
import Hackathon from './pages/team/Hackathon';

import Member from './pages/member/Member';





// 게임게시판 페이지
import Board from './pages/Board';

function App() {
  return (
  <AuthProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />


            <Route path="/notice" element={<Notice />} />

            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/create" element={<ProtectedRoute element={<QuizCreate />} />} />
            <Route path="/quiz/get/:id" element={<QuizDetail />} />
            <Route path="/quiz/update/:id" element={<QuizUpdate />} />
            <Route path="/quiz/category" element={<QuizCategory />} />
            <Route path='/quiz/myresults' element={<ProtectedRoute element={<QuizMyResults />} />} />
            <Route path='/quiz/myquizzes' element={<ProtectedRoute element={<QuizMyQuizzes />} />} />
            <Route path='/quiz/ai' element={<ProtectedRoute element={<QuizAi />} />} />

            <Route path="/team" element={<Team />} />
            <Route path="/team/sidejob" element={<Sidejob />} />
            <Route path="/team/shortproject" element={<ShortProject />} />
            <Route path="/team/competition" element={<Competition />} />
            <Route path="/team/hackathon" element={<Hackathon />} />

            <Route path="/member" element={<Member />} />


            <Route path="/board" element={<Board />} />
        </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
