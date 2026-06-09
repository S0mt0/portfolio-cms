import { NextResponse } from "next/server";

import { FRONTEND_BASE_URL } from "@/lib/constants";
import { noteCommentRepository } from "@/lib/db/repositories/notes";
import { extractErrorMessage } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": FRONTEND_BASE_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const comment = await noteCommentRepository.likeById(id);

    if (!comment) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { headers: corsHeaders, status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Liked",
        data: {
          id: comment._id?.toString(),
          likes: comment.likes || 0,
        },
      },
      { headers: corsHeaders, status: 200 }
    );
  } catch (error) {
    const message =
      extractErrorMessage(error) || "Something went wrong, try again.";
    return NextResponse.json(
      { success: false, message },
      { headers: corsHeaders, status: 500 }
    );
  }
}
