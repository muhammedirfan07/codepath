import { Route } from "react-router-dom"
import Dashboard from "../../features/students/pages/Dashboard"
import Module from "../../features/students/pages/modules/Module";
import ModuleDetail from "../../features/students/pages/modules/ModuleDetails";
import LessonFullPage from "../../features/students/pages/modules/LessonFullPage";
import CodeGround from "../../features/students/pages/codeground/CodeGround";
import ProblemDetailPage  from "../../features/students/pages/codeground/ProblemDetailPage";
import FindMentor from "../../features/students/pages/FIndMentor/FindMentor";
import Documnetation from "../../features/students/pages/Documentation/Documnetation";
import Quizzes from "../../features/students/pages/Quize/Quizzes";
import MentorDetailPage from "../../features/students/pages/FIndMentor/MentorDetailPage";
import Message from "../../features/students/pages/chat/Message";
import VideoSessionPage from "../../features/students/pages/chat/VideoSessionPage";
import Mybooking from "../../features/students/pages/MyBookings/Mybooking";


const UserRouter = (
  <>
    <Route path="/student/dashboard" element={<Dashboard />} />
    <Route path="/student/modules" element={<Module />} />
    <Route path="/student/modules/:moduleId" element={<ModuleDetail />} />
    <Route path="/student/modules/:moduleId/lessons/:lessonId" element={<LessonFullPage />} />
    <Route path="/student/codeground" element={< CodeGround />} />
    <Route path="/student/codeground/:problemId" element={< ProblemDetailPage />} />
    <Route path="/student/mentors" element={< FindMentor />} />
    <Route path="/student/mentors/:mentorId" element={< MentorDetailPage />} />
    <Route path="/student/quizzes" element={< Quizzes />} />
    <Route path="/student/docs" element={< Documnetation />} />
    <Route path="/student/chats" element={< Message />} />
    <Route path="/student/chats/:chatId" element={< VideoSessionPage />} />
    <Route path="/student/bookings" element={< Mybooking />} />
  </>
);

export default UserRouter