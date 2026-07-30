import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import logo from "../../assets/LOGO.png";
import {
  ArrowLeft,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { ThreeDMarquee } from "../../ui/3d-marquee";

const marqueeImages = [
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
];

function Loginn() {
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
            <img src={logo} alt="CodePath" className="h-6 w-auto sm:h-7" />
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
      <div className="flex items-center justify-center bg-white px-6 py-10 ">
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
            <img src={logo} alt="CodePath" className="h-6 w-auto sm:h-7" />
          </div>
          <h1 className="font-display text-3xl font-semibold">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to continue your path. No account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:underline"
            >
              Create one
            </Link>
            .
          </p>
           <TypewriterLine />
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label
                className="block text-sm font-medium leading-6 text-muted-foreground"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@codepath.dev"
              />
            </div>
            <div>
              <div className=" flex justify-between">
                <label
                  className="block text-sm font-medium leading-6 text-muted-foreground"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                to=""
                  className="block text-xs font-medium leading-6 text-muted-foreground hover:text-violet" 
                >
                 Forgot?
                </Link>
              </div>
              <input
                className="mt-1 block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center cursor-pointer rounded-md px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 w-full gradient-violet text-primary-foreground hover:opacity-95"
            >
              Login
            </button>
            <div className="relative py-2 text-center">
              <span className="relative z-10 bg-background px-2 text-xs text-muted-foreground">
                or
              </span>
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 -z-0 h-px bg-border"
              />
            </div>
            <button
              type="submit"
              className="w-full border px-4 py-3 text-sm font-semibold border-black/10  cursor-pointer rounded-md bg-white  text-center text-zinc-900 hover:border-[#7C3AED]/10 hover:bg-[#7C3AED]/10 hover:text-zinc-900"
            >
              Continue with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function TypewriterLine() {
  const phrases = [
    "CodePath test",
    "code test",
    "console.log('CodePath')",
  ];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index];
    if (!deleting) {
      if (text === current) {
        const timeout = setTimeout(() => setDeleting(true), 1500);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
    if (text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(() => {
      setText(current.slice(0, text.length - 1));
    }, 60);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases]);

  return (
    <div className="mt-3 h-6 font-mono text-sm text-violet" aria-hidden>
      <span className="opacity-60">$</span> {text}
      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-violet align-middle" />
    </div>
  );
}

export default Loginn;
