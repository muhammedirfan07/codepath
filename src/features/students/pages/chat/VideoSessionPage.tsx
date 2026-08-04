import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar";
import StudentHeader from "../../components/StudentHeader";
import SessionCallView from "../../components/chat/SessionCallView";

interface CallLocationState {
  name?: string;
  initials?: string;
}

function VideoSessionPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId: string }>();
  const location = useLocation();

  const state = (location.state as CallLocationState) || {};
  const name = state.name ?? "Mentor";
  const initials = state.initials ?? "ME";

  const handleLeave = () => {
    // Back to the conversation the call was started from, if we have one.
    navigate(chatId ? `/student/chats` : -1 as unknown as string);
  };

  return (
    <div className="flex min-h-screen w-full">
      <StudentSidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
      <div className="flex flex-1 flex-col">
        <StudentHeader onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 overflow-x-hidden bg-background p-4 md:px-6 md:py-2">
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
            1:1 with {name}
          </h1>

          <div className="mt-4">
            <SessionCallView name={name} initials={initials} onLeave={handleLeave} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default VideoSessionPage;