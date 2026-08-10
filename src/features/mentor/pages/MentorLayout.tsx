import { Outlet } from "react-router-dom"
import { useAcademyTheme } from "../../../Hook/useAcademyTheme"



function MentorLayout() {
    useAcademyTheme()
  return (
   <Outlet/>
  )
}

export default MentorLayout