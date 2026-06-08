import { NextResponse } from "next/server";

import { FRONTEND_BASE_URL } from "@/lib/constants";
import { buildRepository } from "@/lib/db/repositories/build.repository";
import { landingRepository } from "@/lib/db/repositories/landing";
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

export async function GET() {
  try {
    const { _id, createdAt, updatedAt, ...content } =
      await landingRepository.get();
    const [featuredBuilds, featuredNotes] = await Promise.all([
      buildRepository
        .collection()
        .find({ featured: true })
        .sort({ updatedAt: -1 })
        .limit(content.selectedWorks.featuredCount || 2)
        .toArray(),
      noteRepository.findFeatured(content.selectedNotes.featuredCount || 2),
    ]);

    return NextResponse.json(
      {
        success: true,
        message: "Fetch successful",
        data: {
          ...content,
          selectedWorks: {
            ...content.selectedWorks,
            items: featuredBuilds.map((build) => {
              const {
                _id: buildId,
                createdAt: buildCreatedAt,
                updatedAt: buildUpdatedAt,
                ...buildContent
              } = build;

              return {
                id: buildId?.toString(),
                ...buildContent,
                createdAt: buildCreatedAt.toISOString(),
                updatedAt: buildUpdatedAt.toISOString(),
              };
            }),
          },
          selectedNotes: {
            ...content.selectedNotes,
            items: featuredNotes.map((note) => ({
              id: note._id?.toString(),
              title: note.title,
              slug: note.slug,
              excerpt: note.excerpt || "",
              published: note.published,
              featured: note.featured,
              bannerImage: note.bannerImage,
              bannerCaption: note.bannerCaption,
              tags: note.tags || [],
              readTime: note.readTime || "1 min read",
              publishedAt: note.publishedAt?.toISOString() ?? null,
              updatedAt: (note.updatedAt ?? note.createdAt).toISOString(),
            })),
          },
          createdAt: createdAt.toISOString(),
          updatedAt: updatedAt.toISOString(),
          id: _id?.toString(),
        },
      },
      { headers: corsHeaders, status: 200 }
    );
  } catch (error) {
    console.error("Error fetching landing page:", error);
    const message =
      extractErrorMessage(error) || "Something went wrong, try again.";
    return Response.json(
      { success: false, message },
      { headers: corsHeaders, status: 500 }
    );
  }
}
