import React, { useEffect, useState } from "react";
import MentorHeader from "../components/MentorHeader";
import MentorSidebar from "../components/MentorSidebar";
import MentorProfileCard from "../components/Dashboard/MentorProfileCard";
import AppointmentStrike from "../components/Dashboard/AppointmentStrike";
import UpcomingSession from "../components/Dashboard/UpcomingSession";
import ResentChat from "../components/Dashboard/ResentChat";
import EarningsTrend from "../components/Dashboard/EarningsTrend";
import SessionAnalysis from "../components/Dashboard/SessionAnalysis";
import CounterCards from "../components/Dashboard/CounterCards";


function Dashboard() {

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <MentorSidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <MentorHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden bg-background p-3 md:p-5">
          <div className="mx-auto max-w-7xl">
            <div className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-4">
                {/* Profile card — row-span-2 on large screens */}
                <MentorProfileCard />
                {/* Pending requests, today's sessions, earnings */}
                <CounterCards />
                {/* Session analysis — col-span-2 */}
                <SessionAnalysis />
                {/* Earnings trend */}
                <EarningsTrend />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <AppointmentStrike />
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                <UpcomingSession />
                <ResentChat />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;