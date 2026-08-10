import React, { useState } from 'react'
import MentorHeader from '../../components/MentorHeader'
import MentorSidebar from '../../components/MentorSidebar'
import MentorChatPanel from '../../components/chats/MentorChatPanel'


function MentorChat() {
    const[mobileNavOpen,setMobileNavOpen]= useState(false)
  return (
    <div className=' flex min-h-screen w-full bg-background'>
         <MentorSidebar  mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)}/>
         <div className='flex  flex-1 min-w-0 flex-col '>
           <MentorHeader onMenuClick={() => setMobileNavOpen(true)} />
          <main className='className="flex-1 overflow-x-hidden bg-background p-4 md:px-6 md:py-2"'>           
              <MentorChatPanel/>          
          </main>
         </div>
        </div>
  )
}

export default MentorChat