"use server";
import { revalidatePath } from "next/cache";

import { landingRepository } from "../db/repositories/landing";
import {
  HeroSectionSchema,
  LandingAsideSchema,
  LandingSelectedNotesSchema,
  LandingSelectedWorksSchema,
  TLandingAsideSchema,
  THeroSectionSchema,
  TLandingSelectedNotesSchema,
  TLandingSelectedWorksSchema,
} from "../schemas/landing.schema";
import { requireAdminSession } from "../auth/guards";

function revalidateLanding() {
  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/landing/hero");
  revalidatePath("/landing/works");
  revalidatePath("/landing/notes");
  revalidatePath("/landing/aside");
  revalidatePath("/api/public/landing");
}

export async function updateLandingHero(values: THeroSectionSchema) {
  await requireAdminSession();

  const validated = HeroSectionSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid fields" };

  const data = validated.data;

  const content = await landingRepository.get();

  try {
    await landingRepository.update({
      key: "landing",
      hero: {
        ...content.hero,
        pageLabel: data.pageLabel,
        greeting: data.greeting,
        headline: data.headline,
        intro: data.intro,
        portraitImageUrl: data.portraitImageUrl || "",
        primaryCta: data.primaryCta,
        secondaryCta: data.secondaryCta,
        snapshots: data.snapshots,
      },
    });

    revalidateLanding();
  } catch (error) {
    console.log({ error });
    return { error: "Could not update hero section" };
  }
}

export async function updateLandingWorks(values: TLandingSelectedWorksSchema) {
  await requireAdminSession();

  const validated = LandingSelectedWorksSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid fields" };

  const content = await landingRepository.get();
  const data = validated.data;

  try {
    await landingRepository.update({
      key: "landing",
      selectedWorks: {
        ...content.selectedWorks,
        eyebrow: data.eyebrow,
        title: data.title,
        linkLabel: data.linkLabel,
        linkHref: data.linkHref,
      },
    });

    revalidateLanding();
  } catch (error) {
    console.log({ error });
    return { error: "Could not update selected works" };
  }
}

export async function updateLandingNotes(values: TLandingSelectedNotesSchema) {
  await requireAdminSession();

  const validated = LandingSelectedNotesSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid fields" };

  const content = await landingRepository.get();
  const data = validated.data;

  try {
    await landingRepository.update({
      key: "landing",
      selectedNotes: {
        ...content.selectedNotes,
        eyebrow: data.eyebrow,
        title: data.title,
        linkLabel: data.linkLabel,
        linkHref: data.linkHref,
      },
    });

    revalidateLanding();
  } catch (error) {
    console.log({ error });
    return { error: "Could not update selected notes" };
  }
}

export async function updateLandingAside(values: TLandingAsideSchema) {
  await requireAdminSession();

  const validated = LandingAsideSchema.safeParse(values);
  if (!validated.success) return { error: "Invalid fields" };

  const content = await landingRepository.get();
  const data = validated.data;

  try {
    await landingRepository.update({
      key: "landing",
      aside: {
        ...content.aside,
        studyTitle: data.studyTitle,
        studyDescription: data.studyDescription,
        studyItems: data.studyItems,
        toolboxTitle: data.toolboxTitle,
        toolboxDescription: data.toolboxDescription,
        skillGroups: data.skillGroups,
      },
    });

    revalidateLanding();
  } catch (error) {
    console.log({ error });
    return { error: "Could not update aside" };
  }
}
