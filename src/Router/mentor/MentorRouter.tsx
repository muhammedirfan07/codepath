import { Route } from "react-router-dom";
import Dashboard from "../../features/mentor/pages/Dashboard";

const MentorRouter =(
    <Route path="/mentor/dashboard" element={<Dashboard/>}/>
)
export default MentorRouter