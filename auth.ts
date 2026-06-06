import { betterAuth } from "better-auth/minimal";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { BASE_URL } from "@/lib/constants";
import {
  GITHUB_PLACEHOLDER_EMAIL_DOMAIN,
  isAllowedAdminUser,
} from "@/lib/auth/allowlist";
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
          if (!isAllowedAdminUser(user)) {
            throw new Error(
              "This CMS is private. Use an allowlisted admin email or GitHub account."
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
        defaultValue: "user",
      },

      provider: {
        type: "string",
        input: false,
        required: false,
      },

      githubId: {
        type: "string",
        input: false,
        required: false,
      },

      githubLogin: {
        type: "string",
        input: false,
        required: false,
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
      mapProfileToUser: (profile) => {
        const githubId = String(profile.id);

        return {
          name: profile.name || profile.login || "GitHub user",
          email:
            profile.email ?? `${githubId}@${GITHUB_PLACEHOLDER_EMAIL_DOMAIN}`,
          image: profile.avatar_url,
          provider: "github",
          githubId,
          githubLogin: profile.login,
          emailVerified: true,
        };
      },
    },

    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => ({
        image: profile.picture,
        provider: "google",
      }),
    },
  },

  plugins: [nextCookies()],
});
