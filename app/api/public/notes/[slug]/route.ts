import { NextResponse } from "next/server";

import { FRONTEND_BASE_URL } from "@/lib/constants";
import { noteRepository } from "@/lib/db/repositories/notes";
import { extractErrorMessage } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": FRONTEND_BASE_URL,
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const note = await noteRepository.findBySlug(slug);

    if (!note || !note.published) {
      return Response.json(
        { success: false, message: "Note not found" },
        { headers: corsHeaders, status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Fetch successful",
        data: {
          id: note._id?.toString(),
          title: note.title,
          slug: note.slug,
          excerpt: note.excerpt || "",
          content: note.content,
          featured: note.featured,
          bannerImage: note.bannerImage,
          bannerCaption: note.bannerCaption,
          tags: note.tags || [],
          readTime: note.readTime || "1 min read",
          publishedAt: note.publishedAt?.toISOString() ?? null,
          updatedAt: (note.updatedAt ?? note.createdAt).toISOString(),
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
