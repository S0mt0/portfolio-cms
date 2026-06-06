import { Suspense } from "react";

import { AuthShell } from "../_components/auth-shell";
import { LoginForm } from "../_components/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Open the studio."
      note="Sign in with an allowlisted admin email. The CMS stays private until the public portfolio needs an update."
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
