"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import { getSafeCallbackUrl } from "@/lib/auth/routes";
import { loginSchema, type LoginInput } from "@/lib/schemas/auth.schema";

import { SocialButtons } from "./social-buttons";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = getSafeCallbackUrl(searchParams.get("callbackUrl"));
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  }>();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginInput) {
    setMessage(undefined);
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL,
    });

    if (error) {
      setMessage({
        type: "error",
        text:
          error.message === "EMAIL_NOT_VERIFIED"
            ? "Please verify your email before opening the studio."
            : error.message ||
              "Login failed. Check your details and try again.",
      });
      return;
    }

    router.push(callbackURL);
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <SocialButtons />
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-ink/45">
        <span className="h-px flex-1 bg-ink/15" />
        email
        <span className="h-px flex-1 bg-ink/15" />
      </div>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
          <p className="text-sm text-tomato">
            {form.formState.errors.email?.message}
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-sm font-semibold text-ink/60 hover:text-ink"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...form.register("password")}
          />
          <p className="text-sm text-tomato">
            {form.formState.errors.password?.message}
          </p>
        </div>
        <FormMessage message={message?.text} variant={message?.type} />
        <Button
          className="w-full"
          size="lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Opening..." : "Open CMS"}
        </Button>
      </form>
      <p className="text-center text-sm text-ink/60">
        Need access?{" "}
        <Link
          href={`/auth/signup?callbackUrl=${encodeURIComponent(callbackURL)}`}
          className="font-bold text-ink"
        >
          Create an admin account
        </Link>
      </p>
    </div>
  );
}
