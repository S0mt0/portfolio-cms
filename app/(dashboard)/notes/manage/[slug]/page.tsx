import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Edit3 } from "lucide-react";

import { RichTextContentRenderer } from "@/components/common/render-richtext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { noteRepository } from "@/lib/db/repositories/notes";

import { DashboardPageHeader } from "../../../_components/dashboard-page-header";

export default async function NoteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await noteRepository.findBySlug(slug);

  if (!note) notFound();

  return (
    <div>
      <DashboardPageHeader
        eyebrow="Notes / Read"
        title={note.title}
        description={note.excerpt || "Read-only preview of this note."}
      />

      <article className="overflow-hidden rounded-3xl border border-ink/15 bg-paper/90">
        {note.bannerImage ? (
          <div className="relative h-105 border-b border-ink/10">
            <Image
              src={note.bannerImage}
              alt={note.title}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="space-y-6 p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant={note.published ? "default" : "outline"}>
                {note.published ? "Published" : "Draft"}
              </Badge>
              {note.featured ? (
                <Badge className="bg-honey text-ink">Featured</Badge>
              ) : null}
              <Badge variant="secondary">{note.readTime || "1 min read"}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline">
                <Link href="/notes/manage">
                  <ArrowLeft />
                  Back to notes
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/notes/manage/${note.slug}/edit`}>
                  <Edit3 />
                  Edit note
                </Link>
              </Button>
            </div>
          </div>

          {note.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}

          {note.bannerCaption ? (
            <p className="border-l-2 border-tomato pl-3 text-sm text-ink/55">
              {note.bannerCaption}
            </p>
          ) : null}

          <RichTextContentRenderer
            content={note.content}
            className="notes-editor max-w-none"
          />
        </div>
      </article>
    </div>
  );
}
