import { useState } from "react";
import {
  Atom,
  Braces,
  Database,
  GitBranch,
  Leaf,
  Server,
  Terminal,
} from "lucide-react";
import StudentHeader from "../../components/StudentHeader";
import StudentSidebar from "../../components/StudentSidebar";
import AiAssistant from "../../components/AiAssistant";
import ModuleCard from "../../components/ModuleCards";
import { useAsyncError, useNavigate } from "react-router-dom";
import ModuleCardShadow from "../../../../ui/ModuleCardShadow";

const MODULES = [
  {
    id: "react",
    title: "React Fundamentals",
    description: "Components, hooks, state, and modern React patterns.",
    icon: Atom,
    accent: "sky" as const,
    lessonsCount: 8,
    doneCount: 0,
    hours: "~3h",
  },
  {
    id: "javascript",
    title: "JavaScript Deep Dive",
    description: "Closures, async, prototypes, and the event loop.",
    icon: Braces,
    accent: "amber" as const,
    lessonsCount: 8,
    doneCount: 0,
    hours: "~3h",
  },
  {
    id: "nodejs",
    title: "Node.js & Backend",
    description: "Express, APIs, authentication, and server design.",
    icon: Server,
    accent: "success" as const,
    lessonsCount: 7,
    doneCount: 0,
    hours: "~3h",
  },
  {
    id: "python",
    title: "Python Basics",
    description: "Syntax, data structures, and scripting essentials.",
    icon: Terminal,
    accent: "violet" as const,
    lessonsCount: 7,
    doneCount: 0,
    hours: "~3h",
    isPro: true,
  },
  {
    id: "sql",
    title: "SQL Mastery",
    description: "Queries, joins, indexes, and database design.",
    icon: Database,
    accent: "violet" as const,
    lessonsCount: 6,
    doneCount: 0,
    hours: "~2h",
  },
  {
    id: "mongodb",
    title: "MongoDB Atlas",
    description: "NoSQL modeling, aggregation, and scaling.",
    icon: Leaf,
    accent: "success" as const,
    lessonsCount: 6,
    doneCount: 0,
    hours: "~2h",
    isPro: true,
  },
  {
    id: "git",
    title: "Git & Version Control",
    description: "Branching, merging, and collaborative workflows.",
    icon: GitBranch,
    accent: "sky" as const,
    lessonsCount: 6,
    doneCount: 0,
    hours: "~2h",
    isPro: true,
  },
];

function Module() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isloading,setIsLoading]=useState(true)
  const navigate = useNavigate();
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
              <div className=" mb-4">
                <h2 className="truncate font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Learning modules
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete every lesson to earn the module badge, then have
                  admin approve it.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                { !isloading? Array.from({ length: 6 }).map((_, i) => <ModuleCardShadow key={i} />)
                :MODULES.map((m) => (
                  <ModuleCard
                    key={m.id}
                    id={m.id}
                    icon={m.icon}
                    accent={m.accent}
                    title={m.title}
                    description={m.description}
                    lessonsCount={m.lessonsCount}
                    doneCount={m.doneCount}
                    hours={m.hours}
                    isPro={m.isPro}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
        <AiAssistant />
      </div>
    </>
  );
}

export default Module;
