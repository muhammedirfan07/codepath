import React, { useState } from 'react'
import MentorHeader from '../components/MentorHeader'
import MentorSidebar from '../components/MentorSidebar'
import MentorProfileCard from '../components/Dashboad/MentorProfileCard';
import AppointmentStrike from '../components/Dashboad/AppointmentStrike';
import UpcomingSession from '../components/Dashboad/UpcomingSession';
import ResentChat from '../components/Dashboad/ResentChat';
import EarningsTrend from '../components/Dashboad/EarningsTrend';
import SessionAnalysis from '../components/Dashboad/SessionAnalysis';


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
          <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
             <div className='space-y-4'>
              <div className='grid gap-4 lg:grid-cols-4'>
            {/* Profile card  row-span-2  */}
              <MentorProfileCard/>
             {/*
             Pending Requists 
              today session 
              earning  
               */}  
            {/* session analysis col-span-2 */}
             <SessionAnalysis/>
            {/* earing tred */}
              <EarningsTrend/>
              </div>
              <div className='grid gap-4 lg:grid-cols-3'>
              <AppointmentStrike/>
              </div>
              <div className='grid gap-4 lg:grid-cols-3'>
              <UpcomingSession/>
               <ResentChat/>
              </div>
             </div>
            </div>
          </main>
        </div>
  
      </div>
    </>
  );
}

export default Dashboard