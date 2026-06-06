import { isValidEmail } from "../utils";

export const GITHUB_PLACEHOLDER_EMAIL_DOMAIN = "github.placeholder.local";

const splitList = (value?: string) =>
  value
    ?.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean) ?? [];

export const adminEmails = splitList(process.env.DEFAULT_ADMIN_EMAILS ?? "");
export const adminGithubIds = splitList(
  process.env.DEFAULT_ADMIN_GITHUB_IDS ?? ""
);
export const adminGithubNames = splitList(
  process.env.DEFAULT_ADMIN_GITHUB_NAMES ?? ""
);

export function isAllowedAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminEmails.includes(email.trim().toLowerCase());
}

export function isAllowedAdminGithubName(name?: string | null) {
  if (!name) return false;
  return adminGithubNames.includes(name.trim().toLowerCase());
}

export function isAllowedAdminGithubId(id?: string | null) {
  if (!id) return false;
  return adminGithubIds.includes(id.trim().toLowerCase());
}

export function isGithubPlaceholderEmail(email?: string | null) {
  if (!email) return false;
  return email
    .trim()
    .toLowerCase()
    .endsWith(`@${GITHUB_PLACEHOLDER_EMAIL_DOMAIN}`);
}

type AdminUserIdentity = {
  email?: string | null;
  provider?: unknown;
  githubId?: unknown;
  githubLogin?: unknown;
  name?: unknown;
};

export function isAllowedAdminGithubAccount(user: AdminUserIdentity) {
  return (
    isAllowedAdminGithubId(String(user.githubId ?? "")) ||
    isAllowedAdminGithubName(String(user.githubLogin ?? "")) ||
    isAllowedAdminGithubName(String(user.name ?? ""))
  );
}

export function isAllowedAdminUser(user?: AdminUserIdentity | null) {
  if (!user) return false;

  if (isValidEmail(user.email ?? "") && isAllowedAdminEmail(user.email)) {
    return true;
  }

  if (user.provider === "github" && isAllowedAdminGithubAccount(user)) {
    return true;
  }

  return false;
}

export function isAllowedAdmin(handle?: string | null) {
  if (isValidEmail(handle ?? "")) return isAllowedAdminEmail(handle);
  return isAllowedAdminGithubName(handle);
}
