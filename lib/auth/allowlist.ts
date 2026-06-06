const splitList = (value?: string) =>
  value
    ?.split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean) ?? [];

export const adminEmails = splitList(process.env.DEFAULT_ADMIN_EMAILS ?? "");

export function isAllowedAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminEmails.includes(email.trim().toLowerCase());
}
