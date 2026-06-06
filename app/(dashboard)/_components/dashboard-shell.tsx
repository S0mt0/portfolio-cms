"use client";

import type { User } from "better-auth";
import { BookOpen, BriefcaseBusiness, FolderKanban, Gamepad2, Home, LogOut, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Profile", href: "/profile", icon: Sparkles },
  { label: "Experience", href: "/experience", icon: BriefcaseBusiness },
  { label: "Builds", href: "/builds", icon: FolderKanban },
  { label: "Notes", href: "/notes", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: Mail },
  { label: "Extra", href: "/extra", icon: Gamepad2 },
];

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User & { role?: string | null };
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  return (
    <main className="min-h-dvh bg-paper text-ink">
      <div className="notebook-grid min-h-dvh">
        <div className="mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-5 py-5 lg:flex-row lg:gap-8 lg:px-8">
          <aside className="mb-5 rounded-3xl border border-ink/15 bg-paper/85 p-4 lg:sticky lg:top-5 lg:mb-0 lg:h-[calc(100dvh-2.5rem)] lg:w-72">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-ink/15 bg-honey font-black">
                  S
                </div>
                <div>
                  <p className="font-script text-2xl leading-none">Somto</p>
                  <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ink/50">
                    portfolio cms
                  </p>
                </div>
              </div>
              <ThemeToggle />
            </div>

            <nav className="mt-8 grid gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold text-ink/65 transition hover:bg-ink/5 hover:text-ink",
                      active && "bg-ink text-paper hover:bg-ink hover:text-paper"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 border-t border-ink/10 pt-4 lg:absolute lg:bottom-4 lg:left-4 lg:right-4">
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="truncate text-xs text-ink/55">{user.email}</p>
              <Button className="mt-3 w-full" variant="outline" onClick={signOut}>
                <LogOut />
                Sign out
              </Button>
            </div>
          </aside>

          <section className="flex-1 py-5 lg:py-10">{children}</section>
        </div>
      </div>
    </main>
  );
}
