import { Menu, X } from "lucide-react";
import { useState, useEffect, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/LOGO.png"

function ScrollingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#steps", label: "How it works" },
    { href: "#pricing", label: "pricing" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 250);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const headerOffset = 90; 
      const top =
        el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <div
        className={`pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6 ${
          scrolled ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <div className="pointer-events-auto flex h-14 w-full max-w-4xl items-center gap-3 rounded-full border border-black/[0.06] bg-white/95 px-3 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          <Link to="/" className="flex shrink-0 items-center gap-2 pl-1 pr-1">
             <img src={logo} alt="CodePath" className="h-7 w-auto sm:h-8" />
          </Link>
          <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="rounded-full px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:bg-black/[0.04] hover:text-[#7C3AED]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex shrink-0 items-center gap-2">
            <Link
              to="/login"
              className="hidden text-sm font-medium text-zinc-700 hover:text-[#7C3AED] sm:inline-flex"
            >
              Log in
            </Link>
            <Link
            to="/register"
            className="rounded-full bg-[#7C3AED] px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.7)] hover:bg-[#6D28D9]"
          >
            Get Started
          </Link>
            <button
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-black/10 bg-white text-zinc-800 md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            aria-label="Close"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-x-3 top-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between pb-3">
              <span className="font-display text-lg font-semibold tracking-tight text-zinc-900">
                CodePath
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-black/10 text-zinc-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 border-t border-black/[0.06] pt-3 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="rounded-md px-3 py-2.5 text-zinc-800 hover:bg-black/[0.04]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 text-xs grid grid-cols-2 border-t gap-3 border-black/6 pt-3">
                <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full border border-black/10 rounded-md bg-white py-2 text-center text-zinc-900 hover:border-[#7C3AED]/10 hover:bg-[#7C3AED]/10 hover:text-zinc-900"
              >
                Log in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="w-full rounded-md bg-[#7C3AED] py-2 text-center text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.7)] hover:bg-[#6D28D9]"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ScrollingHeader;