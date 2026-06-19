import { redirect } from "next/navigation";
import { APIError } from "better-auth";

import { getCurrentSession } from "@/lib/auth/server";
import { isAllowedAdminEmail, isEnvAdminEmail } from "@/lib/auth/allowlist";

export async function requireAdminSession() {
  const session = await getCurrentSession();

  if (!session?.user || !(await isAllowedAdminEmail(session.user.email))) {
    throw new APIError("UNAUTHORIZED", {
      message:
        "Your access to this CMS studio has been revoked, please contact admin.",
    });
  }

  return session;
}

export async function requireEnvAdminSession() {
  const session = await requireAdminSession();

  if (!isEnvAdminEmail(session.user.email)) {
    redirect("/");
  }

  return session;
}
