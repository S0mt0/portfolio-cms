import { Plus, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardPageHeader } from "../_components/dashboard-page-header";
import { ModuleCard } from "../../../components/common/module-card";
import { TiptapNoteEditor } from "./_components/tiptap-note-editor";

export default function NotesPage() {
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Notes"
        title="Write things people can learn from."
        description="Draft articles, security notes, and research pieces here. TipTap is already scaffolded so the editor can grow into a proper publishing surface."
        action={
          <div className="flex gap-2">
            <Button variant="outline">
              <Plus />
              New note
            </Button>
            <Button>
              <Save />
              Save draft
            </Button>
          </div>
        }
      />
      <ModuleCard>
        <TiptapNoteEditor />
      </ModuleCard>
    </div>
  );
}
