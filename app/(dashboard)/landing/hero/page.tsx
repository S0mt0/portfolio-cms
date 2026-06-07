import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { updateLandingHero } from "@/lib/actions/landing.actions";
import { landingRepository } from "@/lib/db/repositories/landing.repository";

import { DashboardPageHeader } from "../../_components/dashboard-page-header";
import { ModuleCard } from "../../_components/module-card";
import { TextareaField, TextField } from "../_components/landing-form-fields";

export default async function LandingHeroPage() {
  const { hero } = await landingRepository.get();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Landing / Hero"
        title="Shape the opening note."
        description="This controls the first text people read, the two main actions, the floating cursor portrait, and the small side notes."
      />

      <form action={updateLandingHero} className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <ModuleCard className="space-y-4">
          <TextField label="Page label" name="pageLabel" defaultValue={hero.pageLabel} />
          <TextField label="Greeting" name="greeting" defaultValue={hero.greeting} />
          <TextareaField label="Headline" name="headline" defaultValue={hero.headline} />
          <TextareaField label="Intro" name="intro" defaultValue={hero.intro} />
          <TextField
            label="Floating portrait image"
            name="portraitImageUrl"
            defaultValue={hero.portraitImageUrl}
            hint="Public image path or absolute URL. This maps to the cursor-following portrait."
          />
        </ModuleCard>

        <ModuleCard className="space-y-4 bg-honey/30">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <TextField
              label="Primary CTA label"
              name="primaryCtaLabel"
              defaultValue={hero.primaryCta.label}
            />
            <TextField
              label="Primary CTA href"
              name="primaryCtaHref"
              defaultValue={hero.primaryCta.href}
            />
            <TextField
              label="Secondary CTA label"
              name="secondaryCtaLabel"
              defaultValue={hero.secondaryCta.label}
            />
            <TextField
              label="Secondary CTA href"
              name="secondaryCtaHref"
              defaultValue={hero.secondaryCta.href}
            />
          </div>
          <TextareaField
            label="Side notes"
            name="snapshots"
            defaultValue={hero.snapshots
              .map((item) => `${item.label}: ${item.value}`)
              .join("\n")}
            hint="One per line. Use the format Label: short note."
          />
          <Button className="w-full" size="lg">
            <Save />
            Save hero
          </Button>
        </ModuleCard>
      </form>
    </div>
  );
}
