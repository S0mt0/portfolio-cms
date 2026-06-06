import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { BASE_URL } from "@/lib/constants";
import { isAllowedAdminEmail } from "@/lib/auth/allowlist";
import { db, client } from "@/lib/db/config";
import { mailService } from "@/lib/services/mail.service";

export const auth = betterAuth({
  baseURL: BASE_URL,
  secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  trustedOrigins: [BASE_URL],

  databaseHooks: {
    user: {
      create: {
        async before(user) {
          if (!isAllowedAdminEmail(user.email)) {
            throw new Error(
              "This CMS is private. Use an allowlisted admin email."
            );
          }

          return {
            data: {
              ...user,
              role: "admin",
            },
          };
        },
      },
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        required: false,
        defaultValue: "admin",
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 15,
    sendResetPassword: async ({ user, url }) => {
      await mailService.sendResetPasswordEmail({
        to: user.email,
        url,
      });
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60,
    sendVerificationEmail: async ({ user, url, token }) => {
      await mailService.sendVerificationEmail({
        to: user.email,
        url,
        token,
      });
    },
  },

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      async getUserInfo(token) {
        const headers = {
          Authorization: `Bearer ${token.accessToken}`,
          Accept: "application/vnd.github+json",
        };
        const [profileResponse, emailsResponse] = await Promise.all([
          fetch("https://api.github.com/user", { headers }),
          fetch("https://api.github.com/user/emails", { headers }),
        ]);
        const profile = await profileResponse.json();
        const emails = emailsResponse.ok ? await emailsResponse.json() : [];
        const primaryEmail = Array.isArray(emails)
          ? emails.find((email) => email.primary && email.verified)?.email ??
            emails.find((email) => email.verified)?.email
          : null;
        const email = profile.email || primaryEmail || "";

        return {
          user: {
            id: String(profile.id),
            name: profile.name || profile.login || "GitHub user",
            email,
            emailVerified: Boolean(email),
            image: profile.avatar_url,
          },
          data: profile,
        };
      },
    },

    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  plugins: [nextCookies()],
});
