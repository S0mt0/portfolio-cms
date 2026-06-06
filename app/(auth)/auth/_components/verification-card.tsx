"use client";

import Link from "next/link";
import { useState } from "react";

import { FormMessage } from "@/components/common/form-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";

export function VerificationCard() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" }>();

  async function resend() {
    setPending(true);
    setMessage(undefined);
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/",
    });
    setPending(false);

    if (error) {
      setMessage({ type: "error", text: error.message || "Verification email could not be sent." });
      return;
    }

    setMessage({ type: "success", text: "Verification link sent. Check your inbox." });
  }

  return (
    <div className="space-y-4">
      <FormMessage
        message="If you just created an email/password account, open the verification link from your inbox. Social sign-ins can skip this page."
        variant="neutral"
      />
      <div className="space-y-2">
        <Label htmlFor="email">Resend link</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@email.com"
        />
      </div>
      <FormMessage message={message?.text} variant={message?.type} />
      <Button className="w-full" size="lg" disabled={pending || !email} onClick={resend}>
        {pending ? "Sending..." : "Send verification link"}
      </Button>
      <Link href="/auth/login" className="block text-center text-sm font-bold text-ink/65 hover:text-ink">
        Back to sign in
      </Link>
    </div>
  );
}
