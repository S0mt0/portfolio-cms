import Link from "next/link";

import { Button } from "@/components/ui/button";

import { AuthShell } from "../_components/auth-shell";

const errorCopy: Record<string, { title: string; message: string; hint: string }> = {
  email_not_found: {
    title: "GitHub did not share an email.",
    message:
      "GitHub can hide your email unless the sign-in request includes email access. The CMS asks for that scope now and will only accept a verified GitHub email.",
    hint: "Try GitHub again and approve email access. Then make sure that verified email is inside DEFAULT_ADMIN_EMAILS.",
  },
  unable_to_create_user: {
    title: "This email cannot enter the CMS.",
    message:
      "The CMS is private. New users can only be created when the email is in the admin allowlist.",
    hint: "Add the email to DEFAULT_ADMIN_EMAILS and try again.",
  },
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; code?: string }>;
}) {
  const params = await searchParams;
  const code = params.error || params.code || "unknown_error";
  const copy =
    errorCopy[code] ??
    {
      title: "Something interrupted sign in.",
      message:
        "The provider returned an error before the CMS could open. Try again, or use email and password if the issue keeps happening.",
      hint: "Check the callback URL, provider settings, and allowlisted email.",
    };

  return (
    <AuthShell eyebrow="Hold up" title={copy.title} note={copy.message}>
      <div className="rounded-3xl border border-ink/15 bg-paper/80 p-5">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.24em] text-ink/45">
          error code
        </p>
        <p className="mt-2 break-all rounded-2xl border border-ink/15 bg-ink px-3 py-2 font-mono text-sm font-bold text-paper">
          {code}
        </p>
        <p className="mt-5 text-sm leading-6 text-ink/65">{copy.hint}</p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/auth/login">Back to login</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}
