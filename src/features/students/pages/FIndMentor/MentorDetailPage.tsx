import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentHeader from '../../components/StudentHeader'
import StudentSidebar from '../../components/StudentSidebar'
import AiAssistant from '../../components/AiAssistant'
import MentorDetailView from '../../components/Find_Mentor/MentorDetailView'
import  { mentors } from '../../components/Find_Mentor/mockMentors'

function MentorDetailPage() {
  const { mentorId } = useParams<{ mentorId: string }>()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mentor = mentors.find((m) => m.id === Number(mentorId))

  return (
    <div className="flex min-h-screen w-full">
      <StudentSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex flex-1 flex-col">
        <StudentHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden bg-background">
          {mentor ? <MentorDetailView mentor={mentor} /> : <div className="p-6 text-sm text-muted-foreground">Mentor not found.</div>}
        </main>
      </div>
      <AiAssistant />
    </div>
  )
}

export default MentorDetailPage