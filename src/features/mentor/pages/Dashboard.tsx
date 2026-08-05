import React, { useState } from 'react'
import MentorHeader from '../components/MentorHeader'
import MentorSidebar from '../components/MentorSidebar'

function Dashboard() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
  <>
      <div className="flex min-h-screen w-full">
        <MentorSidebar
          mobileOpen={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
        />
        <div className="flex flex-1 flex-col">
          <MentorHeader onMenuClick={() => setMobileNavOpen(true)} />
          <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6"></main>
        </div>
  
      </div>
    </>
  );
}

export default Dashboard