import { AuthShell } from "../_components/auth-shell";
import { ForgotPasswordForm } from "../_components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="No panic"
      title="Reset the key."
      note="Enter the admin email and Better Auth will send a short-lived reset link."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
