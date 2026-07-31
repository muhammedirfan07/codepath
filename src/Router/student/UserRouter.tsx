import { Route } from "react-router-dom"
import Dashboard from "../../features/students/pages/Dashboard"
import Module from "../../features/students/pages/Module";
 
const UserRouter = (
  <>
    <Route path="/student/dashboard" element={<Dashboard />} />
    <Route path="/student/modules" element={<Module />} />
    
  </>
);

export default UserRouter