import { NextResponse } from "next/server";

import { landingRepository } from "@/lib/db/repositories/landing.repository";

export async function GET() {
  const { _id, createdAt, updatedAt, ...content } = await landingRepository.get();

  return NextResponse.json({
    data: {
      ...content,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      id: _id?.toString(),
    },
  });
}
