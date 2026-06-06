import { AuthShell } from "../_components/auth-shell";
import { VerificationCard } from "../_components/verification-card";

export default function VerifyEmailPage() {
  return (
    <AuthShell
      eyebrow="One more thing"
      title="Verify your email."
      note="Email/password accounts need verification before the CMS opens."
    >
      <VerificationCard />
    </AuthShell>
  );
}
