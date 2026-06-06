import { Suspense } from "react";

import { AuthShell } from "../_components/auth-shell";
import { SignupForm } from "../_components/signup-form";

export default function SignupPage() {
  return (
    <AuthShell
      eyebrow="First pass"
      title="Create access."
      note="Only allowlisted admin emails can create CMS accounts. After signup, verify your email before signing in."
    >
      <Suspense>
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
