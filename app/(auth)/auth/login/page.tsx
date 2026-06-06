import { Suspense } from "react";

import { AuthShell } from "../_components/auth-shell";
import { MagicLinkForm } from "../_components/magic-link-form";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome in"
      title="Open the studio."
      note="Use Google, GitHub, or a one-time email link. The CMS only opens for allowlisted admin identities."
    >
      <Suspense>
        <MagicLinkForm />
      </Suspense>
    </AuthShell>
  );
}
