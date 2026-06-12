import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { FRONTEND_BASE_URL, isProduction } from "@/lib/constants";
import { NewsletterSubscriberSchema } from "@/lib/schemas/newsletter.schema";
import { extractErrorMessage, parseValidationError } from "@/lib/utils";

const corsHeaders = {
  "Access-Control-Allow-Origin": FRONTEND_BASE_URL,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Credentials": "true",
};

export async function OPTIONS() {
  return new Response(null, { headers: corsHeaders, status: 204 });
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

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      undefined;

    const response = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: validated.data.email,
        type: "regular",
        ip_address: ip,
        tags: ["portfolio"],
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message:
            data?.detail || data?.message || "Could not subscribe this email.",
        },
        { status: Number(response.status), headers: corsHeaders }
      );
    }

    const cookieStore = await cookies();
    let visitorId = cookieStore.get("__sid")?.value;

    if (!visitorId) {
      visitorId = randomUUID();
      cookieStore.set("__sid", visitorId, {
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    console.log({ data });

    return NextResponse.json(
      {
        success: true,
        message:
          "You're in. Thank you for subscribing to my newsletters.\nI’ll only send notifications when I publish new notes.",
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
