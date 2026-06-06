import { createRepository } from "./base.repository";
import type { ContactContent } from "@/lib/types/content";

export const contactRepository = createRepository<ContactContent>("contactContent");
