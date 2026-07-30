import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import logo from "../../assets/LOGO.png"
import { ArrowLeft, Code2, GraduationCap, Sparkles, Star, Users } from "lucide-react";
import { ThreeDMarquee } from "../../ui/3d-marquee";
import { cn } from "../../lib/utils";

const marqueeImages = [
  "https://assets.aceternity.com/cloudinary_bkp/3d-card.png",
  "https://assets.aceternity.com/animated-modal.png",
  "https://assets.aceternity.com/animated-testimonials.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Tooltip_luwy44.png",
  "https://assets.aceternity.com/github-globe.png",
  "https://assets.aceternity.com/glare-card.png",
  "https://assets.aceternity.com/layout-grid.png",
  "https://assets.aceternity.com/flip-text.png",
  "https://assets.aceternity.com/hero-highlight.png",
  "https://assets.aceternity.com/carousel.webp",
  "https://assets.aceternity.com/placeholders-and-vanish-input.png",
  "https://assets.aceternity.com/shooting-stars-and-stars-background.png",
  "https://assets.aceternity.com/signup-form.png",
  "https://assets.aceternity.com/cloudinary_bkp/stars_sxle3d.png",
  "https://assets.aceternity.com/spotlight-new.webp",
  "https://assets.aceternity.com/cloudinary_bkp/Spotlight_ar5jpr.png",
  "https://assets.aceternity.com/cloudinary_bkp/Parallax_Scroll_pzlatw_anfkh7.png",
  "https://assets.aceternity.com/tabs.png",
  "https://assets.aceternity.com/cloudinary_bkp/Tracing_Beam_npujte.png",
  "https://assets.aceternity.com/cloudinary_bkp/typewriter-effect.png",
  "https://assets.aceternity.com/glowing-effect.webp",
  "https://assets.aceternity.com/hover-border-gradient.png",
  "https://assets.aceternity.com/cloudinary_bkp/Infinite_Moving_Cards_evhzur.png",
  "https://assets.aceternity.com/cloudinary_bkp/Lamp_hlq3ln.png",
  "https://assets.aceternity.com/macbook-scroll.png",
  "https://assets.aceternity.com/cloudinary_bkp/Meteors_fye3ys.png",
  "https://assets.aceternity.com/cloudinary_bkp/Moving_Border_yn78lv.png",
  "https://assets.aceternity.com/multi-step-loader.png",
  "https://assets.aceternity.com/vortex.png",
  "https://assets.aceternity.com/wobble-card.png",
  "https://assets.aceternity.com/world-map.webp",
];
export default function RegisterPage() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"learner" | "mentor">("learner");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return toast.error("Fill all fields");
    toast.success("Account created!");
    nav(role === "mentor" ? "/mentor/apply" : "/user/dashboard");
  };

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left side — 3D marquee */}
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-violet-900 lg:flex lg:flex-col">
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-violet-700/85 via-violet-800/85 to-violet-950/90" />
        <ThreeDMarquee
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
          images={marqueeImages}
        />

        {/* Logo */}
        <div className="relative z-20 flex items-center gap-2 p-12 pb-0">
          <div className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-4 backdrop-blur-md ring-1 ring-white/20">
             <img src={logo} alt="CodePath" className="h-4 w-auto sm:h-7" />
          </div>
        </div>

        <div className="relative z-20 flex flex-1 flex-col justify-center gap-6 p-12">
          <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md ring-1 ring-white/20">
            <Sparkles className="h-3.5 w-3.5" />
            AI mentor matcher included
          </div>
          <h2 className="max-w-md font-display text-4xl font-semibold text-white">
            A learning path that adapts to you.
          </h2>
          <p className="max-w-md text-sm text-white/80">
            Lessons, live code, quizzes and human mentors — all in one focused
            workspace.
          </p>

          <div className="mt-4 max-w-sm rounded-2xl bg-white/10 p-5 backdrop-blur-md ring-1 ring-white/20">
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-sm text-white">
              "The AI matcher paired me with a mentor who'd done the exact
              career jump I wanted."
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
              <Users className="h-3.5 w-3.5" />
              Priya · Frontend engineer
            </div>
          </div>
        </div>

        <p className="relative z-20 p-12 pt-0 text-xs text-white/50">
          © 2026 CodePath
        </p>
      </div>

      {/* Right side — register form */}
      <div className="flex items-center justify-center px-6 py-10 ">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back home
            </Link>
          </div>
          <div className="mb-6 flex items-center gap-2 lg:hidden">
            <div className="grid h-8 w-8 place-items-center rounded-lg gradient-violet text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-semibold">CodePath</span>
          </div>
          <h1 className="font-display text-3xl font-semibold">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have one?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:underline"
            >
              Log in
            </Link>
            .
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label
              className= "block text-sm font-medium leading-6 text-muted-foreground"
              >I want to join as</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <RoleTile
                  active={role === "learner"}
                  onClick={() => setRole("learner")}
                  icon={GraduationCap}
                  label="Learner"
                  desc="Lessons, quizzes, mentors"
                />
                <RoleTile
                  active={role === "mentor"}
                  onClick={() => setRole("mentor")}
                  icon={Users}
                  label="Mentor"
                  desc="Teach & earn"
                />
              </div>
            </div>
            <div>
              <label
               className= "block text-sm font-medium leading-6 text-muted-foreground"
               htmlFor="name">Full name</label>
              <input
                className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
              />
            </div>
            <div>
              <label
               className= "block text-sm font-medium leading-6 text-muted-foreground" 
              htmlFor="email">Email</label>
              <input
              className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@codepath.dev"
              />
            </div>
            <div>
              <label
               className= "block text-sm font-medium leading-6 text-muted-foreground"
               htmlFor="password">Password</label>
              <input
              className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 w-full gradient-violet text-primary-foreground hover:opacity-95"
            >
              Create account
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms and Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function RoleTile({
  active,
  onClick,
  icon: Icon,
  label,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof GraduationCap;
  label: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-3 text-left transition-all",
        active
          ? "border-primary bg-primary/5 ring-2 ring-primary/30"
          : "border-border hover:border-primary/40",
      )}
    >
      <div
        className={cn(
          "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
          active
            ? "gradient-violet text-primary-foreground"
            : "bg-muted text-muted-foreground",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        <div className="truncate text-xs text-muted-foreground">{desc}</div>
      </div>
    </button>
  );
}