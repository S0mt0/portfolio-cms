import { NextResponse } from "next/server";

import { FRONTEND_BASE_URL } from "@/lib/constants";
import {
  noteCommentRepository,
  noteRepository,
} from "@/lib/db/repositories/notes";
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

    const [comments, relatedPosts] = await Promise.all([
      noteCommentRepository.findByNoteSlug(slug),
      noteRepository.findRelated(note, 4),
    ]);

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
          allowComments: note.allowComments ?? false,
          bannerImage: note.bannerImage,
          bannerCaption: note.bannerCaption,
          tags: note.tags || [],
          readTime: note.readTime || "1 min read",
          author: note.author || { name: "Somto", image: null },
          publishedAt: note.publishedAt?.toISOString() ?? null,
          updatedAt: (note.updatedAt ?? note.createdAt).toISOString(),
          comments: comments.map((comment) => ({
            id: comment._id?.toString(),
            name: comment.name,
            website: comment.website || "",
            content: comment.content,
            likes: comment.likes || 0,
            createdAt: comment.createdAt.toISOString(),
          })),
          relatedPosts: relatedPosts.map((item) => ({
            id: item._id?.toString(),
            title: item.title,
            slug: item.slug,
            excerpt: item.excerpt || "",
            bannerImage: item.bannerImage || "",
            tags: item.tags || [],
            readTime: item.readTime || "1 min read",
            publishedAt: item.publishedAt?.toISOString() ?? null,
          })),
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
