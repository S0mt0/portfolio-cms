const isDevelopment = process.env.NODE_ENV === "development";

export const BASE_URL =
  process.env.BETTER_AUTH_URL ||
  process.env.BASE_URL ||
  (isDevelopment ? "http://localhost:3000" : "https://admin.talktosomto.xyz");

export const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL ||
  (isDevelopment ? "http://localhost:3001" : "https://talktosomto.xyz");
