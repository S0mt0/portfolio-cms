import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/server";
import { isAllowedAdminEmail } from "@/lib/auth/allowlist";

export async function requireAdminSession() {
  const session = await getCurrentSession();

  if (!session?.user || !isAllowedAdminEmail(session.user.email)) {
    redirect("/auth/login");
  }

  return session;
}
