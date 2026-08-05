import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  HelpCircle,
  Library,
  Users,
  CalendarClock,
  MessagesSquare,
  Crown,
  UserCircle,
  Settings,
  Bell,
  X,
} from "lucide-react";
import logo1 from "../../../assets/LOGOcopy.png"
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const MentorNav: NavItem[] = [
  { title: "Dashboard", href: "/mentor/dashboard", icon: LayoutDashboard },
  { title: "Booking", href: "/student/modules", icon: BookOpen },
  { title: "Schedule", href: "/student/codeground", icon: Code2 },
  { title: "Chats", href: "/student/quizzes", icon: HelpCircle },
  
];

const accountNav: NavItem[] = [
  { title: "Premium", href: "/student/premium", icon: Crown },
  { title: "Profile", href: "/student/profile", icon: UserCircle },
  { title: "Settings", href: "/student/settings", icon: Settings },
];

interface MentorSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function MentorSidebar({ mobileOpen, onClose }:MentorSidebarProps) {
  const location = useLocation();

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(href + "/");

  const renderGroup = (label: string, items: NavItem[]) => (
    <div className="mb-4">
      <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        {label}
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.title}>
              <Link
                to={item.href}
                onClick={onClose}
                className={`flex h-10 items-center gap-3 rounded-full px-3 text-sm mb-1 font-medium transition-all ${
                  active
                    ? "bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-md"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge && (
                  <span
                    className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-semibold ${
                      active ? "bg-white/25 text-white" : "bg-amber-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const sidebarBody = (
    <div className="flex h-full flex-col bg-white">
      {/* Logo / brand */}
      <div className="flex items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-1">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-violet-600 ">
           <img className="w-full bg-cover" src={logo1} alt="C" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-base font-semibold leading-tight text-gray-900">
              CodePath
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-gray-400">
              Mentor portal
            </span>
          </div>
        </Link>
        {/* Close button, mobile only */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2">
        {renderGroup("Mentor", MentorNav)}
        {renderGroup("Account", accountNav)}
      </div>

      {/* Footer / profile */}
      <div className="p-3">
        <Link
          to="/student/profile"
          onClick={onClose}
          className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-colors hover:bg-gray-50"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-purple-700 text-xs font-semibold text-white">
            JD
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm font-semibold text-gray-900">
              John Doe
            </span>
            <span className="truncate text-[11px] text-gray-500">Pro Mentor</span>
          </div>
          <Bell className="h-4 w-4 shrink-0 text-gray-400" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar — always visible, part of the flex layout */}
      <aside className="hidden w-[260px] shrink-0 border-r border-gray-200 md:block">
        <div className="sticky top-0 h-screen">{sidebarBody}</div>
      </aside>

      {/* Mobile off-canvas drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Overlay */}
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Drawer panel */}
        <div
          className={`absolute inset-y-0 left-0 w-[280px] max-w-[80vw] shadow-xl transition-transform duration-200 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarBody}
        </div>
      </div>
    </>
  );
}

export default MentorSidebar;