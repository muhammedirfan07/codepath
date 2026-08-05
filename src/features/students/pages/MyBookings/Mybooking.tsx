import React, { useMemo, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import AiAssistant from "../../components/AiAssistant";
import MyBookingPanel from "../../components/MyBookings/MyBookingPanel";

// ---- Root ----------------------------------------------------------------
function MyBooking() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
 

  return (
    <div className="flex min-h-screen w-full">
      <StudentSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="flex flex-1 flex-col">
        <StudentHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6">
          <MyBookingPanel/>
        </main>
      </div>
      <AiAssistant />
    </div>
  );
}

export default MyBooking;