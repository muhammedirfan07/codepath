import { Route, Router } from "react-router-dom";
import Dashboard from "../../features/mentor/pages/Dashboard";
import Schedule from "../../features/mentor/pages/Schedule";
import MentorLayout from "../../features/mentor/pages/MentorLayout";

const MentorRouter =(
   <Route element={<MentorLayout/>} >
        <Route path="/mentor/dashboard" element={<Dashboard/>}/>
        <Route path="/mentor/schedule" element={<Schedule/>}/>
        
   </Route>
)
export default MentorRouter