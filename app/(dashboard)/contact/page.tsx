import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardPageHeader } from "../_components/dashboard-page-header";
import { ModuleCard } from "../../../components/common/module-card";

const channels = [
  "Email",
  "GitHub",
  "X / Twitter",
  "LinkedIn",
  "YouTube",
  "TikTok",
];

export default function ContactPage() {
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Contact"
        title="Keep the door useful."
        description="Manage social handles, contact links, and the details people need when they want to work with you."
        action={
          <Button>
            <Plus />
            Add link
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {channels.map((channel) => (
          <ModuleCard key={channel}>
            <p className="font-script text-3xl text-tomato">{channel}</p>
            <p className="mt-6 text-sm leading-6 text-ink/65">
              Add the public URL, visibility, label, and short helper copy for
              this contact channel.
            </p>
          </ModuleCard>
        ))}
      </div>
    </div>
  );
}
