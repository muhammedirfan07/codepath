import React, { useState, useRef, useEffect } from "react";
import { Bell,  PanelLeftOpen, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const ROUTE_HEADINGS: Record<string, { title: string; subtitle: string }> = {
  "/student/dashboard": {
    title: "Dashboard",
    subtitle: "Here's what's happening with your learning today",
  },
  "/student/profile": {
    title: "Profile",
    subtitle: "Manage your personal details and achievements",
  },
  "/student/settings": {
    title: "Settings",
    subtitle: "Customize your account and preferences",
  },
  "/student/premium": {
    title: "Premium",
    subtitle: "Unlock advanced features and content",
  },
  "/student/bookings": {
    title: "My Bookings",
    subtitle: "View and manage your mentor sessions",
  },
  "/student/booking": {
    title: "Book a Session",
    subtitle: "Schedule time with a mentor",
  },
  "/student/modules": {
    title: "Modules",
    subtitle: "Browse your learning modules and lessons",
  },
  "/student/codeground": {
    title: "Codeground",
    subtitle: "Practice coding problems and test your skills",
  },
  "/student/quizzes": {
    title: "Quizzes",
    subtitle: "Test your knowledge and track progress",
  },
  "/student/docs": {
    title: "Documentation",
    subtitle: "Browse language guides and references",
  },
  "/student/mentors": {
    title: "Find Mentors",
    subtitle: "Connect with experienced mentors",
  },
  "/student/chats": {
    title: "Messages",
    subtitle: "Chat with your mentors and peers",
  },
};

function getHeading(path: string) {
  return (
    ROUTE_HEADINGS[path] ?? {
      title: "Hey, John",
      subtitle: "Here's what's happening with your learning today",
    }
  );
}

interface StudentHeaderProps {
  onMenuClick: () => void;
}

function StudentHeader({ onMenuClick }: StudentHeaderProps) {
  const location = useLocation();
  const heading = getHeading(location.pathname);
  const isDashboard = location.pathname === "/student/dashboard";

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-start justify-between gap-4 bg-white/80 px-4 py-5 backdrop-blur-md md:px-8">
      <div className="flex min-w-0 items-start gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="-ml-1  rounded-full p-2 text-gray-500 hover:bg-gray-100 md:hidden"
        >
          < PanelLeftOpen className="h-5 w-5" />
        </button>
        <div className="min-w-0">
          <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
            <span className="truncate">{heading.title}</span>
            {isDashboard && <span role="img" aria-label="wave">👋</span>}
          </h1>
          <p className="mt-1 hidden text-sm text-gray-500 sm:block">
            {heading.subtitle}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => window.dispatchEvent(new Event("open-ai-tutor"))}
          className="flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-2 text-violet-700 hover:bg-violet-200 sm:inline-flex lg:hidden"
          aria-label="Open AI tutor"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-xs  font-medium">AI Tutor</span>
        </button>

        <button className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gray-100 hover:bg-gray-200">
          <Bell className="h-4 w-4 text-gray-700" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-violet-600" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700 text-xs font-semibold text-white"
          >
            JD
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
      </div>
    </header>
  );
}

export default StudentHeader;