import { redirect } from "next/navigation";

import { DashboardShell } from "./_components/dashboard-shell";
import { requireAdminSession } from "@/lib/auth/guards";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  if (!session.user.emailVerified) {
    redirect("/auth/verify-email");
  }

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
