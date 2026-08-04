import React, { useState } from 'react'
import StudentHeader from '../../components/StudentHeader'
import StudentSidebar from '../../components/StudentSidebar'
import AiAssistant from '../../components/AiAssistant'

function Quizzes() {
     const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
   <>
      <div className="flex min-h-screen w-full">
        <StudentSidebar
          mobileOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
        />
        <div className="flex flex-1 flex-col">
          <StudentHeader onMenuClick={() => setMobileNavOpen(true)} />
          <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6"></main>
        </div>
        <AiAssistant />
      </div>
    </>
  );
}

export default Quizzes