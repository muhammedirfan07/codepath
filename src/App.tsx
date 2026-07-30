import './App.css'
import { Routes,Route } from 'react-router-dom'
import {Toaster} from "sonner"
import LandingPage from './common/landing/LandingPage'
import Loginn from './features/auth/Loginn'
import Register from './features/auth/Register'

function App() {
 
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#FBFAF7] text-[#1A1A1A] font-sans">
        <Toaster richColors position="top-right" />
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/login' element={<Loginn/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
     
    </div>
  )
}

export default App
