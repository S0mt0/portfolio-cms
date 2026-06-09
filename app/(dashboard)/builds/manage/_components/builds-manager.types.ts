import type { TBuildItemSchema } from "@/lib/schemas/build.schema";

export type BuildListItem = TBuildItemSchema & {
  id: string;
  order: number;
};

export const emptyBuildForm: TBuildItemSchema = {
  title: "",
  category: "",
  summary: "",
  proofNote: "",
  githubUrl: "",
  liveUrl: "",
  stack: [],
  published: false,
  featured: false,
};
