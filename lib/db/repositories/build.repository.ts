import { createRepository } from "./base.repository";
import type { BuildContent } from "@/lib/types/content";

export const buildRepository = createRepository<BuildContent>("buildContent");
