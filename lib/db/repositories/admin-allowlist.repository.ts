import type { AdminAllowlistEntry } from "@/lib/types/settings";

import { createRepository } from "./base.repository";

const CACHE_TTL_MS = 60_000;

const repository = createRepository<AdminAllowlistEntry>("adminAllowlist");

let cachedEmails: string[] | null = null;
let cachedAt = 0;

const splitList = (value?: string) =>
  value
    ?.split(",")
    .map((item) => normalizeAdminEmail(item))
    .filter(Boolean) ?? [];

export const normalizeAdminEmail = (email?: string | null) =>
  email?.trim().toLowerCase() ?? "";

export const envAdminEmails = splitList(process.env.DEFAULT_ADMIN_EMAILS ?? "");

const refreshCache = (emails: string[]) => {
  cachedEmails = Array.from(new Set(emails));
  cachedAt = Date.now();
  return cachedEmails;
};

async function seedEnvAdmins() {
  if (!envAdminEmails.length) return;

  await Promise.all(
    envAdminEmails.map(async (email) => {
      const existing = await repository.findOne({ email });
      if (!existing) await repository.create({ email });
    })
  );
}

export const adminAllowlistRepository = {
  ...repository,

  async findAll() {
    await seedEnvAdmins();
    return repository.collection().find({}).sort({ email: 1 }).toArray();
  },

  async getEmails() {
    if (cachedEmails && Date.now() - cachedAt < CACHE_TTL_MS) {
      return cachedEmails;
    }

    const entries = await this.findAll();
    return refreshCache([
      ...envAdminEmails,
      ...entries.map((entry) => normalizeAdminEmail(entry.email)),
    ]);
  },

  async isAllowed(email?: string | null) {
    const normalized = normalizeAdminEmail(email);
    if (!normalized) return false;

    const emails = await this.getEmails();
    return emails.includes(normalized);
  },

  async add(email: string) {
    const normalized = normalizeAdminEmail(email);
    const existing = await repository.findOne({ email: normalized });
    if (existing) return existing;

    const created = await repository.create({ email: normalized });
    cachedEmails = null;
    return created;
  },

  async remove(email: string) {
    const normalized = normalizeAdminEmail(email);
    await repository.deleteOne({ email: normalized });
    cachedEmails = null;
  },
};
