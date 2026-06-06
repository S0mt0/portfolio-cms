import { createRepository } from "./base.repository";
import type { ProfileContent } from "@/lib/types/content";

export const profileRepository = createRepository<ProfileContent>("profileContent");
