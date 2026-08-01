import './App.css'
import { Routes,Route } from 'react-router-dom'
import {Toaster} from "sonner"
import LandingPage from './common/landing/LandingPage'
import Loginn from './features/auth/Loginn'
import Register from './features/auth/Register'
import UserRoutes from './Router/student/UserRouter'
import MentorRouter from './Router/mentor/MentorRouter'
import AdminRouter from './Router/admin/AdminRouter'
import Eorro404page from './common/Eorro404page'


function App() {
 
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#FBFAF7] text-[#1A1A1A] font-sans">
        <Toaster richColors position="top-right" />
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Loginn/>}/>
      <Route path='/register' element={<Register/>}/>

      {UserRoutes}
      {MentorRouter}
      {AdminRouter}
       <Route path="/404" element={<Eorro404page/>}/>
    </Routes>
     
    </div>
  )
}

export default App
