import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { updateLandingAside } from "@/lib/actions/landing.actions";
import { landingRepository } from "@/lib/db/repositories/landing.repository";

import { DashboardPageHeader } from "../../_components/dashboard-page-header";
import { ModuleCard } from "../../_components/module-card";
import { TextareaField, TextField } from "../_components/landing-form-fields";

export default async function LandingAsidePage() {
  const { aside } = await landingRepository.get();
  const groups = [...aside.skillGroups];

  while (groups.length < 4) {
    groups.push({ title: "", skills: [] });
  }

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Landing / Aside"
        title="Keep the support column useful."
        description="This area explains the current study track and toolbox without fighting the main content for attention."
      />

      <form action={updateLandingAside} className="space-y-5">
        <ModuleCard className="grid gap-4 lg:grid-cols-2">
          <TextField label="Study title" name="studyTitle" defaultValue={aside.studyTitle} />
          <TextField
            label="Toolbox title"
            name="toolboxTitle"
            defaultValue={aside.toolboxTitle}
          />
          <TextareaField
            label="Study description"
            name="studyDescription"
            defaultValue={aside.studyDescription}
            className="lg:col-span-2"
          />
          <TextareaField
            label="Study list"
            name="studyItems"
            defaultValue={aside.studyItems.join("\n")}
            hint="One current study item per line."
            className="lg:col-span-2"
          />
        </ModuleCard>

        <div className="grid gap-5 lg:grid-cols-2">
          {groups.map((group, index) => {
            const number = index + 1;

            return (
              <ModuleCard key={number} className="space-y-4 bg-paper/70">
                <TextField
                  label={`Toolbox group ${number}`}
                  name={`skillGroup${["One", "Two", "Three", "Four"][index]}Title`}
                  defaultValue={group.title}
                />
                <TextareaField
                  label="Skills"
                  name={`skillGroup${["One", "Two", "Three", "Four"][index]}Skills`}
                  defaultValue={group.skills.join("\n")}
                  hint="One skill per line."
                />
              </ModuleCard>
            );
          })}
        </div>

        <Button size="lg">
          <Save />
          Save aside
        </Button>
      </form>
    </div>
  );
}
