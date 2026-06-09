import { adminAllowlistRepository } from "@/lib/db/repositories/admin-allowlist.repository";

export async function isAllowedAdminEmail(email?: string | null) {
  return adminAllowlistRepository.isAllowed(email);
}
