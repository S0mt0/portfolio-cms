import type { ObjectId } from "mongodb";

export interface CmsDocumentBase {
  _id?: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileContent extends CmsDocumentBase {
  eyebrow: string;
  title: string;
  description: string;
  cvUrl?: string;
}

export interface LandingSnapshotItem {
  label: string;
  value: string;
}

export interface LandingCta {
  label: string;
  href: string;
}

export interface LandingSkillGroup {
  title: string;
  skills: string[];
}

export interface LandingContent extends CmsDocumentBase {
  key: "landing";
  hero: {
    pageLabel: string;
    greeting: string;
    headline: string;
    intro: string;
    portraitImageUrl: string;
    primaryCta: LandingCta;
    secondaryCta: LandingCta;
    snapshots: LandingSnapshotItem[];
  };
  selectedWorks: {
    eyebrow: string;
    title: string;
    linkLabel: string;
    linkHref: string;
    featuredIndexes: string[];
  };
  selectedNotes: {
    eyebrow: string;
    title: string;
    linkLabel: string;
    linkHref: string;
    featuredSlugs: string[];
  };
  aside: {
    studyTitle: string;
    studyDescription: string;
    studyItems: string[];
    toolboxTitle: string;
    skillGroups: LandingSkillGroup[];
  };
}

export interface ExperienceContent extends CmsDocumentBase {
  role: string;
  company: string;
  period: string;
  summary: string;
  order: number;
}

export interface BuildContent extends CmsDocumentBase {
  title: string;
  category: string;
  summary: string;
  githubUrl?: string;
  liveUrl?: string;
  stack: string[];
  featured: boolean;
}

export interface NoteContent extends CmsDocumentBase {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "draft" | "published";
  featured: boolean;
}

export interface ContactContent extends CmsDocumentBase {
  label: string;
  value: string;
  href: string;
  order: number;
}

export interface ExtraContent extends CmsDocumentBase {
  title: string;
  description: string;
  mood: string;
  order: number;
}
