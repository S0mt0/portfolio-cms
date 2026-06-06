import { type CreateEmailOptions, Resend } from "resend";

class MailService {
  private sender: string;
  private resend: Resend;

  constructor(private appName: string = "CMS - Talktosomto") {
    this.sender = `${this.appName} <no-reply@talktosomto.xyz>`;
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendMail(options: Omit<CreateEmailOptions, "from">) {
    return await this.resend.emails.send({
      ...options,
      from: this.sender,
    } as CreateEmailOptions);
  }

  async sendVerificationEmail({
    to,
    url,
  }: {
    to: string;
    url: string;
    token?: string;
  }) {
    try {
      await this.sendMail({
        subject: "Verify your email address",
        to,
        text: `Open this link to verify your CMS email: ${url}`,
        html: `<p>Open <a href="${url}">this link</a> to verify your CMS email</p>`,
      });
    } catch (error) {
      console.error("[error_sending_account_verification_email]: ", error);
    }
  }

  async sendResetPasswordEmail({ to, url }: { to: string; url: string }) {
    try {
      await this.sendMail({
        subject: "Reset your CMS password",
        to,
        text: `Open this link to reset your CMS password: ${url}`,
        html: `<p>Open <a href="${url}">this link</a> to reset your CMS password:</p><p></p><p>This link is valid for 15 minutes.</p>`,
      });
    } catch (error) {
      console.error("[error_sending_password_reset_email]: ", error);
    }
  }
}

export const mailService = new MailService();
