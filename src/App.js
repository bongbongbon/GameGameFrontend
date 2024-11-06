import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


// 공지사항 페이지
import Notice from './pages/Notice';

// 유저 페이지
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

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
import TeamSidejob from './pages/team/TeamSidejob';
import TeamShortProject from './pages/team/TeamShortProject';
import TeamCompetition from './pages/team/TeamCompetition';
import TeamHackathon from './pages/team/TeamHackathon';
import TeamCreate from './pages/team/TeamCreate';

import Member from './pages/member/Member';

// 유저 페이지
import UserProfile from './pages/user/UserProfile';
import UserDelete from './pages/user/UserDelete';

// 이력서 페이지
import ResumeCreate from './pages/resume/ResumeCreate';
import MyResumeList from './pages/resume/MyResumeList';
import ResumeDetail from './pages/resume/ResumeDetail';

// 게임게시판 페이지
import Board from './pages/Board';
import TeamDetail from './pages/team/TeamDetail';

function App() {
  return (
  <AuthProvider>
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />

            <Route path='/user/account/profile' element={<UserProfile />} />
            <Route path='/user/account/delete' element={<UserDelete />} />


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
            <Route path="/team/sidejob" element={<TeamSidejob />} />
            <Route path="/team/shortproject" element={<TeamShortProject />} />
            <Route path="/team/competition" element={<TeamCompetition />} />
            <Route path="/team/hackathon" element={<TeamHackathon />} />
            <Route path="/team/create" element={<TeamCreate />} />
            <Route path="/team/:id" element={<TeamDetail />} />


            <Route path="/resume/create" element={<ResumeCreate />} />
            <Route path="/resume/my" element={<MyResumeList />} />
            <Route path="/resume/:resumeId" element={<ResumeDetail />} />


            <Route path="/member" element={<Member />} />


            <Route path="/board" element={<Board />} />
        </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
