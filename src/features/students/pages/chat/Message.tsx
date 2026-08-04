import React, { useState } from 'react'
import StudentSidebar from '../../components/StudentSidebar'
import StudentHeader from '../../components/StudentHeader'
import ChatPanel from '../../components/chat/ChatPanel';

function Message() {
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
          <main className="flex-1 overflow-x-hidden bg-background p-4 md:px-6 md:py-2">
           <ChatPanel/>
          </main>
        </div>
      </div>
    </>
  )
}

export default Message