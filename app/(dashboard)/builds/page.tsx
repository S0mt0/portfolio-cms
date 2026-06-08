import { ExternalLink, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardPageHeader } from "../_components/dashboard-page-header";
import { ModuleCard } from "../../../components/common/module-card";

const builds = [
  {
    title: "Zita-Onyeka Foundation Platform",
    type: "Public site + CMS ecosystem",
    stack: ["Next.js", "TypeScript", "Tailwind", "CMS", "Payments"],
  },
  {
    title: "Personal Portfolio",
    type: "Personal site",
    stack: ["Next.js 16", "shadcn", "Tailwind CSS", "Framer Motion"],
  },
];

export default function BuildsPage() {
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Builds"
        title="Curate selected work."
        description="Each build should have a plain explanation, links to GitHub/live views, stack tags, and a reason it deserves public space."
        action={
          <Button>
            <Plus />
            Add build
          </Button>
        }
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {builds.map((build, index) => (
          <ModuleCard key={build.title}>
            <p className="font-script text-3xl text-tomato">
              {String(index + 1).padStart(3, "0")}
            </p>
            <p className="mt-6 font-mono text-xs font-black uppercase tracking-[0.24em] text-ink/45">
              {build.type}
            </p>
            <h2 className="mt-2 text-2xl font-black">{build.title}</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {build.stack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-ink/15 px-3 py-1 text-xs font-bold"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="mt-8 flex gap-2">
              <Button variant="outline" size="sm">
                <span className="font-mono text-xs font-black">GH</span>
                GitHub
              </Button>
              <Button size="sm">
                <ExternalLink />
                Live
              </Button>
            </div>
          </ModuleCard>
        ))}
      </div>
    </div>
  );
}
