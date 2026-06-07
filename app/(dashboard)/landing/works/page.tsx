import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { updateLandingWorks } from "@/lib/actions/landing.actions";
import { landingRepository } from "@/lib/db/repositories/landing.repository";

import { DashboardPageHeader } from "../../_components/dashboard-page-header";
import { ModuleCard } from "../../_components/module-card";
import { TextareaField, TextField } from "../_components/landing-form-fields";

export default async function LandingWorksPage() {
  const { selectedWorks } = await landingRepository.get();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Landing / Works"
        title="Choose the proof on the homepage."
        description="The landing page should only show a few builds. Put the build indexes here in the order you want them to appear."
      />

      <form action={updateLandingWorks} className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <ModuleCard className="space-y-4">
          <TextField label="Eyebrow" name="eyebrow" defaultValue={selectedWorks.eyebrow} />
          <TextareaField label="Title" name="title" defaultValue={selectedWorks.title} />
          <TextField label="Link label" name="linkLabel" defaultValue={selectedWorks.linkLabel} />
          <TextField label="Link href" name="linkHref" defaultValue={selectedWorks.linkHref} />
        </ModuleCard>

        <ModuleCard className="space-y-4 bg-blush/30">
          <TextareaField
            label="Featured build indexes"
            name="featuredIndexes"
            defaultValue={selectedWorks.featuredIndexes.join("\n")}
            hint="One index per line. Example: 001"
          />
          <Button className="w-full" size="lg">
            <Save />
            Save selected works
          </Button>
        </ModuleCard>
      </form>
    </div>
  );
}
