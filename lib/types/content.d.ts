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
  bannerImage?: string;
  bannerCaption?: string;
  tags: string[];
  readTime: string;
  published: boolean;
  featured: boolean;
  publishedAt?: Date | null;
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
