import React, { useState } from "react";
import { Bell, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const ROUTE_HEADINGS :Record<string,{title:string;subtitle:string}>={
"/mentor/dashboard": { title: "Hey, Ava 👋", subtitle: "Here's what's happening across your mentoring today" },
  "/mentor/bookings": { title: "Bookings", subtitle: "Confirm requests and join your sessions" },
  "/mentor/schedule": { title: "Schedule", subtitle: "Set the weekly hours students can book" },
  "/mentor/students": { title: "Students", subtitle: "Everyone who has booked a session with you" },
  "/mentor/chats": { title: "Messages", subtitle: "Chat one-on-one with your students" },
  "/mentor/payments": { title: "Payments", subtitle: "Track earnings, payouts, and transactions" },
  "/mentor/profile": { title: "Profile", subtitle: "Manage how learners see you" }
}

function getHearding(path:string){
  return(
    ROUTE_HEADINGS[path] ?? {
    title : "Hey, Ava 👋",
    subtitle :"Here's what's happening across your mentoring today",
    }
  )
}

interface MentorHeaderProps {
  onMenuClick: () => void;
 
}

export default function MentorHeader({onMenuClick}: MentorHeaderProps) {
  const location =useLocation()
  const heading = getHearding (location.pathname)
  const isDashboard = location.pathname ==="/mentor/dashboard"
  const[menuOpen,setMenuOpen]=useState(false)
  const navigate = useNavigate()
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4  bg-background/90 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-foreground hover:bg-secondary lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-xl font-bold text-foreground sm:text-2xl">
             <span className="truncate">{heading.title}</span>        
             {isDashboard && <span role="img" aria-label="wave">👋</span>}
          </h1>
          <p className="hidden truncate text-sm text-muted-foreground sm:block">
            {heading.subtitle}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          className="relative rounded-full p-2 text-foreground hover:bg-secondary"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
        </button>
       <div className="hidden relative md:flex">
          <button onClick={()=>setMenuOpen((open)=>!open)} className="flex size-9 items-center justify-center rounded-full bg-amber text-xs font-bold text-amber-foreground">
            AC
          </button>
          {menuOpen && (
              <div className="absolute right-0 top-12 w-56 rounded-xl border border-gray-200 bg-white py-1.5 shadow-lg">
                <p className="px-3 py-1.5 text-xs font-semibold text-gray-400">
                  My Account
                </p>
                <div className="my-1 h-px bg-gray-100" />
                <Link
                  to="/student/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <Link
                  to="/student/premium"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Upgrade to Pro
                </Link>
                <Link
                  to="/student/settings"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Settings
                </Link>
                <div className="my-1 h-px bg-gray-100" />
                <button className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50">
                  Log out
                </button>
              </div>
            )}
       </div>
        <div className=" md:hidden ">
          <button onClick={()=>navigate('/mentor/profile')} className="flex size-9 items-center justify-center rounded-full bg-amber text-xs font-bold text-amber-foreground">
            AC
          </button>
        </div>
      </div>
    </header>
  );
}