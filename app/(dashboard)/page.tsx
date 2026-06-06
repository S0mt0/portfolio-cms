import { BookOpen, FileText, FolderKanban, Sparkles } from "lucide-react";

const modules = [
  {
    title: "Profile",
    description: "Keep the story, hero copy, and public identity sharp.",
    icon: Sparkles,
    color: "bg-blush",
  },
  {
    title: "Works",
    description: "Curate builds with links, proof, stacks, and plain-language notes.",
    icon: FolderKanban,
    color: "bg-honey",
  },
  {
    title: "Notes",
    description: "Draft essays, security notes, and articles before they go live.",
    icon: BookOpen,
    color: "bg-mint",
  },
  {
    title: "Pages",
    description: "Manage route sections as the dashboard grows beyond auth.",
    icon: FileText,
    color: "bg-sky",
  },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-10">
      <section className="max-w-3xl">
        <p className="font-script text-3xl text-tomato">CMS home</p>
        <h1 className="mt-2 text-5xl font-black tracking-tight text-ink sm:text-6xl">
          A small desk for public proof.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/65">
          Auth is now the front door. The next pass can turn each portfolio section into editable routes, with Mongo repositories behind every content model.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <article
              key={module.title}
              className="rounded-2xl border border-ink/15 bg-paper/80 p-5 shadow-[0_14px_30px_rgba(17,24,39,0.06)]"
            >
              <div className={`mb-10 flex size-11 items-center justify-center rounded-2xl border border-ink/15 ${module.color}`}>
                <Icon className="size-5" />
              </div>
              <h2 className="text-2xl font-black">{module.title}</h2>
              <p className="mt-2 text-sm leading-6 text-ink/65">{module.description}</p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
