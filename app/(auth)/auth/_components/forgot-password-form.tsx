"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";
import { BASE_URL } from "@/lib/constants";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/schemas/auth.schema";

export function ForgotPasswordForm() {
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" }>();
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    setMessage(undefined);
    const { error } = await authClient.requestPasswordReset({
      email: values.email,
      redirectTo: `${BASE_URL}/auth/reset-password`,
    });

    if (error) {
      setMessage({ type: "error", text: error.message || "Reset link could not be sent." });
      return;
    }

    setMessage({
      type: "success",
      text: "If that email has CMS access, a reset link is on the way.",
    });
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Admin email</Label>
        <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
        <p className="text-sm text-tomato">{form.formState.errors.email?.message}</p>
      </div>
      <FormMessage message={message?.text} variant={message?.type} />
      <Button className="w-full" size="lg" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Send reset link"}
      </Button>
      <Link href="/auth/login" className="block text-center text-sm font-bold text-ink/65 hover:text-ink">
        Back to sign in
      </Link>
    </form>
  );
}
