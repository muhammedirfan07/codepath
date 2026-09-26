import { Route } from "react-router-dom";
import Dashboard from "../../features/mentor/pages/Dashboard";
import Schedule from "../../features/mentor/pages/Schedule";
import MentorLayout from "../../features/mentor/pages/MentorLayout"
import MentorChat from "../../features/mentor/pages/chats/MentorChat";
import MentorSessionPage from "../../features/mentor/pages/chats/MentorSessionPage";
import MentorSessionBookingPage from "../../features/mentor/pages/MentorSessionBookingPage";
import FindStudents from "../../features/mentor/pages/FindStudents";
import MentorProfile from "../../features/mentor/pages/MentorProfile";
MentorProfile


const MentorRouter =(
   <Route element={<MentorLayout/>} >
        <Route path="/mentor/dashboard" element={<Dashboard/>}/>
        <Route path="/mentor/schedule" element={<Schedule/>}/>
        <Route path="/mentor/chats" element={<MentorChat/>}/>
        <Route path="/mentor/chats/:chatsId" element={<MentorSessionPage/>}/>
        <Route path="/mentor/bookings" element={<MentorSessionBookingPage/>}/>
        <Route path="/mentor/profile" element={<MentorProfile/>}/>
        
        <Route path="/mentor/students" element={<FindStudents/>}/>
        
   </Route>
)
export default MentorRouter