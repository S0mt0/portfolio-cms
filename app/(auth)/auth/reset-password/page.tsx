import { Suspense } from "react";

import { AuthShell } from "../_components/auth-shell";
import { ResetPasswordForm } from "../_components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthShell
      eyebrow="New key"
      title="Choose a fresh password."
      note="Use the reset link from your inbox. The token expires quickly, so make the change now."
    >
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
