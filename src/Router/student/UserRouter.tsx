import { Route } from "react-router-dom"
import Dashboard from "../../features/students/pages/Dashboard"
import Module from "../../features/students/pages/modules/Module";
import ModuleDetail from "../../features/students/pages/modules/ModuleDetails";
import LessonFullPage from "../../features/students/pages/modules/LessonFullPage";
import CodeGround from "../../features/students/pages/CodeGround";


const UserRouter = (
  <>
    <Route path="/student/dashboard" element={<Dashboard />} />
    <Route path="/student/modules" element={<Module />} />
    <Route path="/student/modules/:moduleId" element={<ModuleDetail />} />
    <Route path="/student/modules/:moduleId/lessons/:lessonId" element={<LessonFullPage />} />
    <Route path="/student/codeground" element={< CodeGround />} />
  </>
);

export default UserRouter