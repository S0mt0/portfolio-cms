import { createRepository } from "./base.repository";
import type { NoteContent } from "@/lib/types/content";

export const noteRepository = createRepository<NoteContent>("noteContent");
