"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import { getSafeCallbackUrl } from "@/lib/auth/routes";
import { signupSchema, type SignupInput } from "@/lib/schemas/auth.schema";

import { SocialButtons } from "./social-buttons";

export function SignupForm() {
  const searchParams = useSearchParams();
  const callbackURL = getSafeCallbackUrl(searchParams.get("callbackUrl"));
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" }>();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignupInput) {
    setMessage(undefined);
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      callbackURL,
    });

    if (error) {
      setMessage({
        type: "error",
        text: error.message || "This account could not be created.",
      });
      return;
    }

    form.reset();
    setMessage({
      type: "success",
      text: "Account created. Check your email to verify it before signing in.",
    });
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
          <Label htmlFor="name">Name</Label>
          <Input id="name" autoComplete="name" {...form.register("name")} />
          <p className="text-sm text-tomato">{form.formState.errors.name?.message}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
          <p className="text-sm text-tomato">{form.formState.errors.email?.message}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete="new-password" {...form.register("password")} />
            <p className="text-sm text-tomato">{form.formState.errors.password?.message}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm</Label>
            <Input id="confirmPassword" type="password" autoComplete="new-password" {...form.register("confirmPassword")} />
            <p className="text-sm text-tomato">{form.formState.errors.confirmPassword?.message}</p>
          </div>
        </div>
        <FormMessage message={message?.text} variant={message?.type} />
        <Button className="w-full" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </form>
      <p className="text-center text-sm text-ink/60">
        Already have access?{" "}
        <Link href={`/auth/login?callbackUrl=${encodeURIComponent(callbackURL)}`} className="font-bold text-ink">
          Sign in
        </Link>
      </p>
    </div>
  );
}
