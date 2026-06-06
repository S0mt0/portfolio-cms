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
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/schemas/auth.schema";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" }>();
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onSubmit(values: ResetPasswordInput) {
    if (!token) {
      setMessage({ type: "error", text: "This reset link is missing its token." });
      return;
    }

    setMessage(undefined);
    const { error } = await authClient.resetPassword({
      newPassword: values.password,
      token,
    });

    if (error) {
      setMessage({ type: "error", text: error.message || "Password could not be reset." });
      return;
    }

    setMessage({ type: "success", text: "Password reset. Taking you back to sign in." });
    setTimeout(() => router.push("/auth/login"), 700);
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      {!token ? (
        <FormMessage message="Open the reset link from your email to continue." variant="error" />
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <Input id="password" type="password" autoComplete="new-password" {...form.register("password")} />
        <p className="text-sm text-tomato">{form.formState.errors.password?.message}</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input id="confirmPassword" type="password" autoComplete="new-password" {...form.register("confirmPassword")} />
        <p className="text-sm text-tomato">{form.formState.errors.confirmPassword?.message}</p>
      </div>
      <FormMessage message={message?.text} variant={message?.type} />
      <Button className="w-full" size="lg" disabled={form.formState.isSubmitting || !token}>
        {form.formState.isSubmitting ? "Saving..." : "Save new password"}
      </Button>
      <Link href="/auth/login" className="block text-center text-sm font-bold text-ink/65 hover:text-ink">
        Back to sign in
      </Link>
    </form>
  );
}
