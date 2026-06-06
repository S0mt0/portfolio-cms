import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/auth/server";
import { isAllowedAdminUser } from "@/lib/auth/allowlist";

export async function requireAdminSession() {
  const session = await getCurrentSession();

  if (!session?.user || !isAllowedAdminUser(session.user)) {
    redirect("/auth/login");
  }

  return session;
}
