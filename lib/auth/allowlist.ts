const splitEmails = (value?: string) =>
  value
    ?.split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean) ?? [];

export const adminEmails = splitEmails(process.env.DEFAULT_ADMIN_EMAILS);

export function isAllowedAdminEmail(email?: string | null) {
  if (!email) return false;
  return adminEmails.includes(email.trim().toLowerCase());
}

export function hasConfiguredAdminEmails() {
  return adminEmails.length > 0;
}
