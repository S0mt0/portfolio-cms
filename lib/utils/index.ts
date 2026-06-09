import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import isEmail from "validator/lib/isEmail";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(value?: string | null): boolean {
  return isEmail(value ?? "");
}

export const generateSlug = (title: string) =>
  title
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s+/g, "-")
    .toLocaleLowerCase();

export const getReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(" ").length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};

export const extractErrorMessage = (err: unknown) => {
  if (err instanceof Error) {
    if (err.message) return err.message;
    else return JSON.stringify(err) || "An error occurred";
  } else return JSON.stringify(err) || "Unknown error occurred";
};

export function formatDate(date: Date | string) {
  return format(new Date(date), "dd MMMM, yyyy");
}

export function formatDateTime(date: Date | string) {
  return format(new Date(date), "dd MMMM, yyyy h:mm a");
}
