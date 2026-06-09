import { NextResponse } from "next/server";

import { FRONTEND_BASE_URL } from "@/lib/constants";
import { noteRepository, notesPageRepository } from "@/lib/db/repositories/notes";
import type { NoteContent } from "@/lib/types/notes";
import { extractErrorMessage } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": FRONTEND_BASE_URL,
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

const NOTE_LIMIT = 10;

const toPublicNoteListItem = (note: NoteContent) => ({
  id: note._id?.toString(),
  title: note.title,
  slug: note.slug,
  excerpt: note.excerpt || "",
  bannerImage: note.bannerImage || "",
  tags: note.tags || [],
  readTime: note.readTime || "1 min read",
  publishedAt: note.publishedAt?.toISOString() ?? null,
  updatedAt: (note.updatedAt ?? note.createdAt).toISOString(),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const currentPage = Math.max(Number(url.searchParams.get("page") || 1), 1);
    const query = url.searchParams.get("q")?.trim() || "";

    const [page, result] = await Promise.all([
      notesPageRepository.get(),
      noteRepository.findPublishedPaginated({
        page: currentPage,
        limit: NOTE_LIMIT,
        query,
      }),
    ]);
    const totalPages = Math.max(Math.ceil(result.total / NOTE_LIMIT), 1);

    return NextResponse.json(
      {
        success: true,
        message: "Fetch successful",
        data: {
          hero: page.hero,
          notes: result.items.map(toPublicNoteListItem),
        },
        pagination: {
          total: result.total,
          page: currentPage,
          limit: NOTE_LIMIT,
          totalPages,
          showingStart: result.total ? (currentPage - 1) * NOTE_LIMIT + 1 : 0,
          showingEnd: Math.min(currentPage * NOTE_LIMIT, result.total),
        },
      },
      { headers: corsHeaders, status: 200 }
    );
  } catch (error) {
    const message =
      extractErrorMessage(error) || "Something went wrong, try again.";
    return Response.json(
      { success: false, message },
      { headers: corsHeaders, status: 500 }
    );
  }
}
