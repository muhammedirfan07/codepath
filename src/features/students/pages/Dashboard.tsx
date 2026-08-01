import { useState } from "react";
import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";
import AiAssistant from "../components/AiAssistant";
import ContinueLearnig from "../components/ContinueLearnig";
import DailyQuestion from "../components/DailyQuestion";
import RecommentCourses from "../components/RecommentCourses";
import ProfileCard from "../components/ProfileCard";
import WeeklyStreakCard from "../components/WeeklyStreakCard";
import CoursesCount from "../components/CoursesCount";
import WeeklyWatchTime from "../components/WeeklyWatchTime";


function Dashboard() {
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
          <main className="flex-1 overflow-x-hidden bg-background p-4 md:p-6">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] ">
                <div className="min-w-0 space-y-8 ">
                  <ContinueLearnig/>
                  <DailyQuestion/>
                  <RecommentCourses/>
                </div>
                <div className="space-y-4 ">
                  <ProfileCard/>
                  <WeeklyStreakCard/>
                  <CoursesCount/>
                  <WeeklyWatchTime/>
                </div>
              </div>
            </div>
          </main>
        </div>
        <AiAssistant />
      </div>
    </>
  );
}

export default Dashboard;