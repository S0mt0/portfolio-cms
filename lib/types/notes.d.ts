import type { CmsDocumentBase } from "./shared";

export interface NotesPageContent extends CmsDocumentBase {
  key: "notes";
  hero: {
    eyebrow: string;
    title: string;
    description?: string;
  };
}

export interface NoteContent extends CmsDocumentBase {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  published: boolean;
  featured: boolean;
  bannerImage?: string;
  bannerCaption?: string;
  tags: string[];
  readTime: string;
  publishedAt?: Date | null;
}
