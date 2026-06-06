"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import { getSafeCallbackUrl } from "@/lib/auth/routes";
import {
  magicLinkSchema,
  type MagicLinkInput,
} from "@/lib/schemas/auth.schema";

import { SocialButtons } from "./social-buttons";

export function MagicLinkForm() {
  const searchParams = useSearchParams();
  const callbackURL = getSafeCallbackUrl(searchParams.get("callbackUrl"));
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>();
  const form = useForm<MagicLinkInput>({
    resolver: zodResolver(magicLinkSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: MagicLinkInput) {
    setMessage(undefined);

    const { error } = await authClient.signIn.magicLink({
      email: values.email,
      callbackURL,
      errorCallbackURL: "/auth/error",
    });

    if (error) {
      setMessage({
        type: "error",
        text:
          error.message ||
          "Failed to send link. Check the email and try again.",
      });
      return;
    }

    form.reset();
    setMessage({
      type: "success",
      text: "Link sent. Open your inbox and use it before it expires.",
    });
  }

  return (
    <div className="space-y-5">
      <SocialButtons />
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-ink/45">
        <span className="h-px flex-1 bg-ink/15" />
        or email link
        <span className="h-px flex-1 bg-ink/15" />
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Admin email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...form.register("email")}
          />
          <p className="text-sm text-tomato">
            {form.formState.errors.email?.message}
          </p>
        </div>
        <FormMessage message={message?.text} variant={message?.type} />
        <Button
          className="w-full"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Sending..." : "Send sign-in link"}
        </Button>
      </form>
      <p className="text-center text-sm leading-6 text-ink/60">
        No password to remember. If the email is allowlisted, the CMS sends a
        one-time link.
      </p>
    </div>
  );
}
