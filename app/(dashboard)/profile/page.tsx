import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardPageHeader } from "../_components/dashboard-page-header";
import { FieldPreview } from "../_components/field-preview";
import { ModuleCard } from "../_components/module-card";

export default function ProfilePage() {
  return (
    <div>
      <DashboardPageHeader
        eyebrow="Profile"
        title="Shape the first impression."
        description="Edit the human intro, current focus, CV link, and the short proof-led copy that appears around the landing hero."
        action={
          <Button>
            <Save />
            Save draft
          </Button>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <ModuleCard>
          <FieldPreview label="Eyebrow" value="Hi, I am Somto" />
          <FieldPreview
            label="Hero title"
            value="I build useful web products and I am growing into smart contract security."
          />
          <FieldPreview
            label="Description"
            value="I build production web systems, then study how protocol logic breaks. The current mission is to turn fullstack delivery experience into smart contract development and security depth."
          />
          <FieldPreview label="CV" value="/somto-cv.pdf" />
        </ModuleCard>
        <ModuleCard className="bg-honey/35">
          <p className="font-script text-3xl text-tomato">Editor note</p>
          <p className="mt-4 text-lg font-black">Keep it warm, short, and useful.</p>
          <p className="mt-3 text-sm leading-6 text-ink/65">
            This page should control the copy that makes the portfolio feel personal without becoming a long bio.
          </p>
        </ModuleCard>
      </div>
    </div>
  );
}
