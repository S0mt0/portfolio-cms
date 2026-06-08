import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardPageHeader } from "../_components/dashboard-page-header";
import { ModuleCard } from "../../../components/common/module-card";

const items = [
  [
    "2022 - now",
    "Fullstack development",
    "Production websites, dashboards, CMS flows, auth, payments, and backend APIs.",
  ],
  [
    "Current",
    "Smart contract security track",
    "Solidity fundamentals, Foundry tests, access control, reentrancy, and protocol assumptions.",
  ],
];

export default function ExperiencePage() {
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Experience"
        title="Tell the path clearly."
        description="Manage the work history and transition story without inflating claims. This should read like proof, not a resume dump."
        action={
          <Button>
            <Plus />
            Add entry
          </Button>
        }
      />
      <div className="space-y-4">
        {items.map(([period, title, summary], index) => (
          <ModuleCard key={title}>
            <div className="grid gap-4 md:grid-cols-[120px_1fr]">
              <p className="font-script text-3xl text-tomato">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-ink/45">
                  {period}
                </p>
                <h2 className="mt-2 text-2xl font-black">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/65">{summary}</p>
              </div>
            </div>
          </ModuleCard>
        ))}
      </div>
    </div>
  );
}
