import { createRepository } from "./base.repository";
import type { ExtraContent } from "@/lib/types/content";

export const extraRepository = createRepository<ExtraContent>("extraContent");
