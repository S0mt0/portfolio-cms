import {
  ArrowRight,
  BookOpen,
  FolderKanban,
  Layers3,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { landingRepository } from "@/lib/db/repositories/landing.repository";

import { ModuleCard } from "./_components/module-card";

const quickLinks = [
  {
    title: "Landing page",
    href: "/landing",
    description: "Hero, featured works, featured notes, current study, toolbox.",
    icon: Layers3,
    color: "bg-honey/45",
  },
  {
    title: "Profile",
    href: "/profile",
    description: "Identity, personal copy, CV link, and public positioning.",
    icon: Sparkles,
    color: "bg-blush/40",
  },
  {
    title: "Builds",
    href: "/builds",
    description: "Projects, links, proof notes, stack tags, and feature flags.",
    icon: FolderKanban,
    color: "bg-sky/45",
  },
  {
    title: "Notes",
    href: "/notes",
    description: "Draft and publish articles with the Tiptap editor.",
    icon: BookOpen,
    color: "bg-mint/45",
  },
];

export default async function DashboardHomePage() {
  const landing = await landingRepository.get();

  return (
    <div className="space-y-10">
      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-script text-3xl text-tomato">CMS desk</p>
          <h1 className="mt-2 max-w-4xl text-5xl font-black tracking-tight text-ink sm:text-6xl">
            Keep the portfolio clear, current, and human.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/65">
            This dashboard is organized by the same sections people see on the
            public site. Start with the landing page, then keep deeper pages
            tidy as the proof grows.
          </p>
        </div>

        <ModuleCard className="bg-paper/70">
          <MessageSquareText className="size-6 text-tomato" />
          <p className="mt-8 font-mono text-xs font-black uppercase tracking-[0.18em] text-ink/45">
            current landing headline
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight">
            {landing.hero.headline}
          </h2>
          <Button asChild className="mt-6">
            <Link href="/landing/hero">
              Edit hero
              <ArrowRight />
            </Link>
          </Button>
        </ModuleCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {quickLinks.map((item) => {
          const Icon = item.icon;

          return (
            <ModuleCard key={item.href} className={item.color}>
              <Icon className="size-6" />
              <h2 className="mt-8 text-2xl font-black">{item.title}</h2>
              <p className="mt-2 min-h-14 text-sm leading-6 text-ink/65">
                {item.description}
              </p>
              <Button asChild className="mt-6" variant="outline">
                <Link href={item.href}>
                  Open
                  <ArrowRight />
                </Link>
              </Button>
            </ModuleCard>
          );
        })}
      </section>
    </div>
  );
}
