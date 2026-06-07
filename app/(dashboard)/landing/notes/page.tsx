import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { updateLandingNotes } from "@/lib/actions/landing.actions";
import { landingRepository } from "@/lib/db/repositories/landing.repository";

import { DashboardPageHeader } from "../../_components/dashboard-page-header";
import { ModuleCard } from "../../_components/module-card";
import { TextareaField, TextField } from "../_components/landing-form-fields";

export default async function LandingNotesPage() {
  const { selectedNotes } = await landingRepository.get();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Landing / Notes"
        title="Feature the writing that matters."
        description="Use note slugs to pull a small set of articles into the landing page without turning the page into a long archive."
      />

      <form action={updateLandingNotes} className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <ModuleCard className="space-y-4">
          <TextField label="Eyebrow" name="eyebrow" defaultValue={selectedNotes.eyebrow} />
          <TextareaField label="Title" name="title" defaultValue={selectedNotes.title} />
          <TextField label="Link label" name="linkLabel" defaultValue={selectedNotes.linkLabel} />
          <TextField label="Link href" name="linkHref" defaultValue={selectedNotes.linkHref} />
        </ModuleCard>

        <ModuleCard className="space-y-4 bg-mint/35">
          <TextareaField
            label="Featured note slugs"
            name="featuredSlugs"
            defaultValue={selectedNotes.featuredSlugs.join("\n")}
            hint="One slug per line. Example: from-fullstack-assumptions-to-protocol-assumptions"
          />
          <Button className="w-full" size="lg">
            <Save />
            Save selected notes
          </Button>
        </ModuleCard>
      </form>
    </div>
  );
}
