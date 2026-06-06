"use client";

import { createAuthClient } from "better-auth/react";

import { BASE_URL } from "@/lib/constants";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
});
