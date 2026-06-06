import { createRepository } from "./base.repository";
import type { ExperienceContent } from "@/lib/types/content";

export const experienceRepository = createRepository<ExperienceContent>("experienceContent");
