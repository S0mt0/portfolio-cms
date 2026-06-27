import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/server";
import { isAllowedAdminEmail, isEnvAdminEmail } from "@/lib/auth/allowlist";
import { auth } from "@/auth";
import { headers } from "next/headers";

export async function requireAdminSession() {
  const session = await getCurrentSession();

  if (!session?.user || !(await isAllowedAdminEmail(session.user.email))) {
    await auth.api.signOut({
      headers: await headers(),
    });

    redirect("/auth/login");
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
