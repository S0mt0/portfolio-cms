"use server";

import { revalidatePath } from "next/cache";

import { landingRepository } from "@/lib/db/repositories/landing.repository";
import type { LandingSkillGroup } from "@/lib/types/content";

const cleanLines = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const field = (formData: FormData, key: string) =>
  String(formData.get(key) ?? "").trim();

function revalidateLanding() {
  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/landing/hero");
  revalidatePath("/landing/works");
  revalidatePath("/landing/notes");
  revalidatePath("/landing/aside");
  revalidatePath("/api/public/landing");
}

export async function updateLandingHero(formData: FormData) {
  const content = await landingRepository.get();

  await landingRepository.update({
    key: "landing",
    hero: {
      ...content.hero,
      pageLabel: field(formData, "pageLabel"),
      greeting: field(formData, "greeting"),
      headline: field(formData, "headline"),
      intro: field(formData, "intro"),
      portraitImageUrl: field(formData, "portraitImageUrl"),
      primaryCta: {
        label: field(formData, "primaryCtaLabel"),
        href: field(formData, "primaryCtaHref"),
      },
      secondaryCta: {
        label: field(formData, "secondaryCtaLabel"),
        href: field(formData, "secondaryCtaHref"),
      },
      snapshots: cleanLines(formData.get("snapshots")).map((line) => {
        const [label, ...rest] = line.split(":");
        return {
          label: label?.trim() || "Note",
          value: rest.join(":").trim() || line,
        };
      }),
    },
  });

  revalidateLanding();
}

export async function updateLandingWorks(formData: FormData) {
  const content = await landingRepository.get();

  await landingRepository.update({
    key: "landing",
    selectedWorks: {
      ...content.selectedWorks,
      eyebrow: field(formData, "eyebrow"),
      title: field(formData, "title"),
      linkLabel: field(formData, "linkLabel"),
      linkHref: field(formData, "linkHref"),
      featuredIndexes: cleanLines(formData.get("featuredIndexes")),
    },
  });

  revalidateLanding();
}

export async function updateLandingNotes(formData: FormData) {
  const content = await landingRepository.get();

  await landingRepository.update({
    key: "landing",
    selectedNotes: {
      ...content.selectedNotes,
      eyebrow: field(formData, "eyebrow"),
      title: field(formData, "title"),
      linkLabel: field(formData, "linkLabel"),
      linkHref: field(formData, "linkHref"),
      featuredSlugs: cleanLines(formData.get("featuredSlugs")),
    },
  });

  revalidateLanding();
}

export async function updateLandingAside(formData: FormData) {
  const content = await landingRepository.get();
  const skillGroups: LandingSkillGroup[] = [
    {
      title: field(formData, "skillGroupOneTitle"),
      skills: cleanLines(formData.get("skillGroupOneSkills")),
    },
    {
      title: field(formData, "skillGroupTwoTitle"),
      skills: cleanLines(formData.get("skillGroupTwoSkills")),
    },
    {
      title: field(formData, "skillGroupThreeTitle"),
      skills: cleanLines(formData.get("skillGroupThreeSkills")),
    },
    {
      title: field(formData, "skillGroupFourTitle"),
      skills: cleanLines(formData.get("skillGroupFourSkills")),
    },
  ].filter((group) => group.title || group.skills.length);

  await landingRepository.update({
    key: "landing",
    aside: {
      ...content.aside,
      studyTitle: field(formData, "studyTitle"),
      studyDescription: field(formData, "studyDescription"),
      studyItems: cleanLines(formData.get("studyItems")),
      toolboxTitle: field(formData, "toolboxTitle"),
      skillGroups,
    },
  });

  revalidateLanding();
}
