import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { FRONTEND_BASE_URL } from "@/lib/constants";
import { newsletterRepository } from "@/lib/db/repositories/newsletter";
import { NewsletterSubscriberSchema } from "@/lib/schemas/newsletter.schema";
import { extractErrorMessage, parseValidationError } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": FRONTEND_BASE_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validated = NewsletterSubscriberSchema.safeParse(payload);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: parseValidationError(validated.error.issues),
        },
        { headers: corsHeaders, status: 400 }
      );
    }

    const cookieStore = await cookies();
    let visitorId = cookieStore.get("__sid")?.value;

    if (!visitorId) {
      visitorId = randomUUID();
      cookieStore.set("__sid", visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    await newsletterRepository.subscribe({
      ...validated.data,
      visitorId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed",
        data: { subscribed: true },
      },
      { headers: corsHeaders, status: 201 }
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
